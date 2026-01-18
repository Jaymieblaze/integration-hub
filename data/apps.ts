// data/apps.ts

export interface App {
  id: string;
  name: string;
  category: string;
  color: string;
}

export const apps: App[] = [
  // AI & Chat
  { id: "chatgpt", name: "ChatGPT", category: "AI", color: "bg-green-500" },
  { id: "claude", name: "Anthropic Claude", category: "AI", color: "bg-orange-500" },
  { id: "whatsapp", name: "WhatsApp", category: "Communication", color: "bg-green-600" },
  { id: "telegram", name: "Telegram", category: "Communication", color: "bg-blue-400" },
  { id: "slack", name: "Slack", category: "Communication", color: "bg-purple-600" },
  { id: "discord", name: "Discord", category: "Communication", color: "bg-indigo-500" },

  // Google Suite
  { id: "gmail", name: "Gmail", category: "Email", color: "bg-red-500" },
  { id: "google-sheets", name: "Google Sheets", category: "Database", color: "bg-green-700" },
  { id: "google-calendar", name: "Google Calendar", category: "Productivity", color: "bg-blue-500" },
  { id: "google-drive", name: "Google Drive", category: "Storage", color: "bg-yellow-500" },

  // Business Tools (High $$ Affiliate)
  { id: "notion", name: "Notion", category: "Productivity", color: "bg-gray-800" },
  { id: "airtable", name: "Airtable", category: "Database", color: "bg-yellow-400" },
  { id: "hubspot", name: "HubSpot", category: "CRM", color: "bg-orange-600" },
  { id: "salesforce", name: "Salesforce", category: "CRM", color: "bg-blue-400" },
  { id: "shopify", name: "Shopify", category: "E-commerce", color: "bg-green-400" },
  { id: "stripe", name: "Stripe", category: "Finance", color: "bg-indigo-600" },
  { id: "paypal", name: "PayPal", category: "Finance", color: "bg-blue-800" },
  { id: "zoom", name: "Zoom", category: "Video", color: "bg-blue-500" },
  { id: "trello", name: "Trello", category: "Project Mgmt", color: "bg-blue-400" },
  { id: "asana", name: "Asana", category: "Project Mgmt", color: "bg-red-400" },
];