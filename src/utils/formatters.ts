export const formatPKR = (amount: number): string => {
  return `Rs. ${amount.toLocaleString('en-PK')}`;
};

export const calculateDiscount = (price: number, oldPrice?: number): number => {
  if (!oldPrice || oldPrice <= price) return 0;
  return Math.round(((oldPrice - price) / oldPrice) * 100);
};

export const validatePakistaniPhone = (phone: string): { isValid: boolean; message?: string } => {
  const cleaned = phone.replace(/[\s-]/g, '');
  // Matches 03XXXXXXXXX (11 digits) or +923XXXXXXXXX (13 chars) or 923XXXXXXXXX (12 digits)
  const pkRegex = /^((\+92)|(0092)|(92)|0)?(3[0-9]{9})$/;
  if (!phone.trim()) {
    return { isValid: false, message: 'Phone number is required for courier delivery' };
  }
  if (!pkRegex.test(cleaned)) {
    return { isValid: false, message: 'Please enter a valid Pakistani phone number (e.g. 0300 1234567)' };
  }
  return { isValid: true };
};

export const formatPakistaniPhone = (value: string): string => {
  const digits = value.replace(/\D/g, '');
  if (digits.startsWith('923')) {
    const rest = digits.slice(3);
    return `+92 3${rest.slice(0, 2)}${rest.length > 2 ? ' ' + rest.slice(2, 9) : ''}`;
  }
  if (digits.startsWith('03')) {
    if (digits.length <= 4) return digits;
    return `${digits.slice(0, 4)}-${digits.slice(4, 11)}`;
  }
  return value;
};
