// data/apps.ts

export interface App {
  id: string;
  name: string;
  category: string;
  color: string;
  logo: string; // Simple Icons slug for CDN
}

export const apps: App[] = [
  // AI & Chat
  { id: "chatgpt", name: "ChatGPT", category: "AI", color: "bg-green-500", logo: "openai" },
  { id: "claude", name: "Anthropic Claude", category: "AI", color: "bg-orange-500", logo: "anthropic" },
  { id: "whatsapp", name: "WhatsApp", category: "Communication", color: "bg-green-600", logo: "whatsapp" },
  { id: "telegram", name: "Telegram", category: "Communication", color: "bg-blue-400", logo: "telegram" },
  { id: "slack", name: "Slack", category: "Communication", color: "bg-purple-600", logo: "slack" },
  { id: "discord", name: "Discord", category: "Communication", color: "bg-indigo-500", logo: "discord" },

  // Google Suite
  { id: "gmail", name: "Gmail", category: "Email", color: "bg-red-500", logo: "gmail" },
  { id: "google-sheets", name: "Google Sheets", category: "Database", color: "bg-green-700", logo: "googlesheets" },
  { id: "google-calendar", name: "Google Calendar", category: "Productivity", color: "bg-blue-500", logo: "googlecalendar" },
  { id: "google-drive", name: "Google Drive", category: "Storage", color: "bg-yellow-500", logo: "googledrive" },

  // Business Tools (High $$ Affiliate)
  { id: "notion", name: "Notion", category: "Productivity", color: "bg-gray-800", logo: "notion" },
  { id: "airtable", name: "Airtable", category: "Database", color: "bg-yellow-400", logo: "airtable" },
  { id: "hubspot", name: "HubSpot", category: "CRM", color: "bg-orange-600", logo: "hubspot" },
  { id: "salesforce", name: "Salesforce", category: "CRM", color: "bg-blue-400", logo: "salesforce" },
  { id: "shopify", name: "Shopify", category: "E-commerce", color: "bg-green-400", logo: "shopify" },
  { id: "stripe", name: "Stripe", category: "Finance", color: "bg-indigo-600", logo: "stripe" },
  { id: "paypal", name: "PayPal", category: "Finance", color: "bg-blue-800", logo: "paypal" },
  { id: "zoom", name: "Zoom", category: "Video", color: "bg-blue-500", logo: "zoom" },
  { id: "trello", name: "Trello", category: "Project Mgmt", color: "bg-blue-400", logo: "trello" },
  { id: "asana", name: "Asana", category: "Project Mgmt", color: "bg-red-400", logo: "asana" },
];