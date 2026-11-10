export interface EnquiryData {
  name: string;
  business: string;
  phone: string;
  email: string;
  industry: string;
  service: string;
  message: string;
}

export function formatWhatsAppMessage(data: EnquiryData): string {
  return [
    'Hello Food Circle, I would like to discuss a food safety requirement.',
    `Name: ${data.name.trim()}`,
    `Business name: ${data.business.trim()}`,
    `Phone: ${data.phone.trim()}`,
    `Email: ${data.email.trim()}`,
    `Industry: ${data.industry.trim()}`,
    `Service required: ${data.service.trim()}`,
    `Message: ${data.message.trim()}`,
  ].join('\n');
}

export function createWhatsAppUrl(phone: string, text: string): string {
  return `https://wa.me/${phone}?text=${encodeURIComponent(text)}`;
}

export function createServiceEnquiryMessage(service: string): string {
  return `Hello Food Circle, I would like to enquire about your ${service} service. Please share more details.`;
}
