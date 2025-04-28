const serverName = process.env.NAME;
const port = process.env.PORT;

export default function Page() {
  return <h1>{serverName} {port}</h1>
}
