import { Session, User } from '@supabase/supabase-js';
import { useContext, useState, useEffect, createContext } from 'react';
import { supabaseClient } from '../config/supabase-client';
import { useRootNavigationState, useRouter, useSegments } from 'expo-router';

// create a context for authentication
const AuthContext = createContext<{
  session: Session | null | undefined,
  user: User | null | undefined,
  signOut: () => void,
  SignIn: (user: Session) => void
}>({ session: null, user: null, signOut: () => { }, SignIn: (user: Session) => { } });

// This hook can be used to access the user info.
export function useAuth() {
  return useContext(AuthContext);
}

// This hook will protect the route access based on user authentication.
function useProtectedRoute(user: Session | null | undefined) {
  const segments = useSegments();
  const router = useRouter();
  const navigationState = useRootNavigationState();

  // debugger
  console.log('segments', segments)
  console.log('user', user)

  useEffect(() => {
    console.log('AUTH useEffect')
    if (!navigationState?.key) {
      // Temporary fix for router not being ready.
      return;
    }
    const inAuthGroup = segments[0] === "(auth)";

    if (
      // If the user is not signed in and the initial segment is not anything in the auth group.
      !user &&
      !inAuthGroup
    ) {
      console.log('not signed in and not in auth group')
      // Redirect to the sign-in page.
      router.replace("/signin")
      // router.replace("/sign-in");
    } else if (user && inAuthGroup) {
      console.log('signed in and in auth group')
      // Redirect away from the sign-in page.
      router.replace("/(home)/home");
    }
  }, [user, segments, navigationState?.key]);
}

export const AuthProvider = ({ children }: any) => {
  const [user, setUser] = useState<User>()
  const [session, setSession] = useState<Session | null>();
  const [loading, setLoading] = useState(true);
  // const navigationState = useRootNavigationState();

  useProtectedRoute(session);

  useEffect(() => {
    const setData = async () => {
      const {
        data: { session }, error
      } = await supabaseClient.auth.getSession();
      if (error) throw error;
      setSession(session)
      setUser(session?.user)
      setLoading(false);
    };

    const { data: listener } = supabaseClient.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      setUser(session?.user)
      setLoading(false)
    });

    setData();
    console.log('session', session)

    // return () => {
    //   listener?.subscription.unsubscribe();
    // };
  }, []);


  const value = {
    session,
    user,
    signOut: () => supabaseClient.auth.signOut(),
    SignIn: (user: Session) => setSession(user)
  };


  // use a provider to pass down the value
  return (
    <AuthContext.Provider value={value}>
      {children}
      {/* {!loading && children} */}
    </AuthContext.Provider>
  );
};
