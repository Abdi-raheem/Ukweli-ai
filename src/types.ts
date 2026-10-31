export interface ExtractedEntities {
  phoneNumbers: string[];
  tillsOrPaybills: string[];
  claimedAmounts: string[];
  suspiciousLinks: string[];
  senderIdentity: string;
}

export interface SecurityIndicators {
  senderAuthenticity?: 'OFFICIAL_SHORTCODE' | 'PERSONAL_PHONE_NUMBER' | 'UNVERIFIED' | 'LEGITIMATE_CONTACT';
  hasUpfrontFeeDemand?: boolean;
  domainStatus?: 'OFFICIAL_KENYAN_DOMAIN' | 'SUSPICIOUS_PHISHING_DOMAIN' | 'NO_LINKS';
  urgencyPressure?: boolean;
  mpesaSyntaxMatch?: boolean;
}

export interface ActionableAdvice {
  english: string;
  swahiliSheng: string;
}

export interface ReportingHotlines {
  safaricomSms: string;
  dciCybercrime: string;
  nc4Kenya: string;
}

export interface AnalysisResult {
  riskLevel: 'HIGH RISK SCAM' | 'MODERATE RISK' | 'SUSPICIOUS' | 'SAFE / LEGITIMATE';
  category: string;
  confidenceScore: number;
  summary: string;
  detectedRedFlags: string[];
  indicators?: SecurityIndicators;
  extractedEntities: ExtractedEntities;
  actionableAdvice: ActionableAdvice;
  immediateVerificationChecks: string[];
  reportingHotlines: ReportingHotlines;
  trainedSamplesActive?: number;
  modelArchitecture?: string;
  mpesaAudit?: {
    isRecognizedMpesaFormat: boolean;
    formatType?: string;
    anomaliesFound: string[];
  };
  warning?: string;
}

export interface MpesaValidationResult {
  isSyntaxValid: boolean;
  transactionType: 'P2P_RECEIVE' | 'P2P_SEND' | 'BUY_GOODS_TILL' | 'PAYBILL' | 'REVERSAL' | 'AIRTIME' | 'INVALID_STRUCTURE';
  transactionCode: string;
  isCodeFormatValid: boolean;
  amount: string;
  senderOrRecipient: string;
  dateTimestamp: string;
  newBalance: string;
  transactionCost: string;
  senderHeader: 'OFFICIAL_MPESA' | 'PERSONAL_PHONE_NUMBER' | 'UNKNOWN';
  anomalies: string[];
  verdict: 'AUTHENTIC_STRUCTURE' | 'SUSPECT_SPOOFED_SMS' | 'HIGH_RISK_FRAUD';
}

export interface ScamScenario {
  id: string;
  title: string;
  category: string;
  riskHint: string;
  text: string;
  description: string;
  contextTag: string;
  sampleImageSvg?: string;
}
