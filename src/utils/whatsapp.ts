export const generateWhatsAppUrl = (data: { name: string; email: string; message: string }): string => {
    const phoneNumber = '918855862263';
    
    // Format the message with asterisks and proper spacing
    const formattedMessage = 
      `*Contact Form Details*\n` +
      `*Name:* ${data.name}\n` +
      `*Email:* ${data.email}\n` +
      `*Message:* ${data.message}`;
    
    // Encode the message for URL
    const encodedMessage = encodeURIComponent(formattedMessage);
    
    return `https://wa.me/${phoneNumber}?text=${encodedMessage}`;
  };