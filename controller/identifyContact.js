import { Contact } from "../model/Contact";

export async function identityContact({ email, phoneNumber }) {
  const existingContact = await Contact.find({
    $or: [{ email: email || null }, { phoneNumber: phoneNumber || null }],
    deleteAt: null,
  }).sort({ createdAt: 1 });

  if (existingContact.length === 0) {
    const newContact = await Contact.create({
      email,
      phoneNumber,
      linkPrecedence: "primary",
    });
    return {
      primaryContactId: newContact._id,
      email: [email],
      phoneNumber: [phoneNumber],
      secondayContactIds: [],
    };
  }

  const primaryContact = existingContact.find(c => c.linkPrecedence === 'primary') || existingContact[0];

  const isNewInfo = !existingContact.some(c => c.email === email && c.phoneNumber === phoneNumber);
  if (isNewInfo){
    await Contact.create({
        email,
        phoneNumber,
        linkPrecedence:"seconday",
        linkedId:primaryContact._id
    })
  }
  const allRelated = await Contact.find({
    $or:[
        {_id:primaryContact._id},
        {linkedId:primaryContact._id}
    ], 
    deleteAt:null
  })
  const emails = [...new Set(allRelated.map(c => c.email).filter(Boolean))];
  const phoneNumbers = [...new Set(allRelated.map(c => c.phoneNumber).filter(Boolean))];
  const secondaryContactIds = allRelated.filter(c => c.linkPrecedence === 'secondary').map(c => c._id);

  return {
    primaryContactId:primaryContact._id,
    emails,
    phoneNumbers,
    secondaryContactIds
  };

}
