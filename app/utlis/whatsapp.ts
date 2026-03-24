const WHATSAPP_NUMBER = "918581841853";

export const getWhatsAppLink = (message: string) => {
  const encodedMessage = encodeURIComponent(message);
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodedMessage}`;
};

export const redirectToWhatsApp = (message: string) => {
  window.open(getWhatsAppLink(message), "_blank");
};
