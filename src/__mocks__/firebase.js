//These constants mock the firebase client functionality

export const signInWithEmailAndPassword = jest
  .fn()
  .mockResolvedValue({ user: { uid: "testUserId" } });
export const signOut = jest.fn().mockResolvedValue();
// Add other Firebase methods you're using in your app
