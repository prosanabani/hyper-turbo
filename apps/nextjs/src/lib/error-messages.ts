import ar from "../../messages/ar.json";
import en from "../../messages/en.json";

type Locale = "ar" | "en";

const messages = { ar, en } as const;

export interface ErrorMessages {
  description: string;
  goToHomepage: string;
  title: string;
  tryAgain: string;
}

export interface GlobalErrorMessages {
  contactSupport: string;
  description: string;
  errorId: string;
  goToHomepage: string;
  title: string;
  tryAgain: string;
}

export function getErrorMessages(locale: Locale): ErrorMessages {
  return messages[locale].Error as ErrorMessages;
}

export function getGlobalErrorMessages(locale: Locale): GlobalErrorMessages {
  return messages[locale].GlobalError as GlobalErrorMessages;
}
