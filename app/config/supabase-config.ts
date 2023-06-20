import Constants from "expo-constants";
export interface IConfig {
  SUPABASE_URL: string;
  SUPABASE_ANON_KEY: string;
}

const Config: IConfig = {
  SUPABASE_URL: Constants?.expoConfig?.extra?.SUPABASE_URL,
  SUPABASE_ANON_KEY: Constants?.expoConfig?.extra?.SUPABASE_KEY,
};

export default Config;
