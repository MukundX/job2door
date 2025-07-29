import { OAuth2Client } from 'google-auth-library';

// Google OAuth configuration
const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID!;
const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET!;
const REDIRECT_URI = process.env.GOOGLE_REDIRECT_URI || 'http://localhost:3000/auth/callback';

export const googleOAuthClient = new OAuth2Client(
  GOOGLE_CLIENT_ID,
  GOOGLE_CLIENT_SECRET,
  REDIRECT_URI
);

export interface GoogleUserInfo {
  id: string;
  email: string;
  name: string;
  picture: string;
  given_name?: string;
  family_name?: string;
}

export async function getGoogleAuthUrl(): Promise<string> {
  const scopes = [
    'https://www.googleapis.com/auth/userinfo.profile',
    'https://www.googleapis.com/auth/userinfo.email'
  ];

  return googleOAuthClient.generateAuthUrl({
    access_type: 'offline',
    scope: scopes,
    prompt: 'consent'
  });
}

export async function getGoogleUserInfo(code: string): Promise<GoogleUserInfo> {
  const { tokens } = await googleOAuthClient.getToken(code);
  googleOAuthClient.setCredentials(tokens);

  const userinfo = await googleOAuthClient.request({
    url: 'https://www.googleapis.com/oauth2/v2/userinfo'
  });

  return userinfo.data as GoogleUserInfo;
} 