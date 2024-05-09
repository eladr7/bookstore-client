import Link from "next/link";

export default async function Home() {
  return (
    <main>
      <h2>Dashboard</h2>
      <div className="flex justify-center my-8">
        <Link href="/books">
          <button className="btn-primary">Enter the catalog</button>
        </Link>
      </div>

      <div className="card">
        <h2>Our moto</h2>

        <div>
          <p>
            We want to give you the best experice, <br />
            so join and see our great books.
            <br />
            <br />
            <small>stay tuned for new amazing books that will arrive</small>
          </p>
        </div>
      </div>
    </main>
  );
}

// npm i zod @hookform/resolvers
// npm i react-hook-form
// npm i zod-validation-error
// npm i @prisma/client
// npm install --save-dev ts-node typescript
// sudo npm i -g @nestjs/cli@latest
// npm i --save class-validator class-transformer
// npm i --save-dev prisma typescript ts-node nodemon @types/node

// TODO:
// tRPC + useQuery for delete and create book!
// add concurrently:
// https://youtu.be/Lam0cYOEst8?si=CgFSkm1odArg1Bb0&t=56
// fix the loading on the submit button
// remove all inline css and move css to classes
// description  String @db.VarChar(400)
// change id to Int increment - i think.
// chhange all interface to type
// Add logs!
// convert grid to tailwind
