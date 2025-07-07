import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { format } from "date-fns";

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

// Function to format a date string to a readable format
export function formatDate(dateString, dateFormat = "MMM dd, yyyy") {
  if (!dateString) return "";
  try {
    return format(new Date(dateString), dateFormat);
  } catch (error) {
    console.error("Error formatting date:", error);
    return dateString; // Return original if parsing fails
  }
}

// Function to format numbers as currency
export function formatCurrency(amount, currency = 'USD') {
  if (typeof amount !== 'number') return amount;
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: currency,
    minimumFractionDigits: 0, // No decimal places for large numbers
    maximumFractionDigits: 0,
  }).format(amount);
}

// Function to safely parse a number, handling very large strings
export function parseAmount(value) {
  if (typeof value === 'number') return value;
  if (typeof value === 'string') {
    // Remove commas for parsing
    const cleaned = value.replace(/,/g, '');
    const num = parseFloat(cleaned);
    return isNaN(num) ? 0 : num;
  }
  return 0;
}