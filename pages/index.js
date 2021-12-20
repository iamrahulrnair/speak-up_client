export default function Home({ currentUser }) {
  return (
    <div>
      <h1>{currentUser ? currentUser.email : 'please login'}</h1>
      <p>Speakup provides a platform to speakUP against an organization.</p>
    </div>
  );
}
