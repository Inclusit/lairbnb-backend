import Link from "next/link";
import { Button } from "@/components/ui/button"; // ShadCN button component
import { Card, CardContent } from "@/components/ui/card"; // ShadCN card component
import Hero from "./Hero";

export default function Homepage() {
  return (
   <> 
    <Hero />
    <div className="flex flex-col items-center justify-center p-4">
      

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {/* Exempel på boenden */}
        {Array.from({ length: 3 }).map((_, index) => (
          <Card
            key={index}
            className="bg-white shadow-md rounded-lg overflow-hidden"
          >
            <img
              src={`https://picsum.photos/400/300?random=${index}`}
              alt={`Boende ${index + 1}`}
              className="w-full h-32 object-cover"
            />
            <CardContent className="p-4">
              <h2 className="font-semibold text-xl mb-2">Boende {index + 1}</h2>
              <p className="text-gray-600 mb-4">
                Beskrivning av boendet. Perfekt för en avkopplande vistelse.
              </p>
              <Link href={`/boende/${index + 1}`}>
                <Button>Visa mer</Button>
              </Link>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="m-10">
        <hr />
        <article className="mb-4 mt-4 text-center py-5 m-20  font-serif" >
            <div className="m-10">
          <p className="text-3xl font-semibold leading-loose underline font-serif">Upptäck din nästa drömdestination med LairBnb</p>
          <br/>
          <p className="italic">Vi är din pålitliga plattform för att hitta unika och bekväma boenden över hela världen. Oavsett om du planerar en romantisk weekend, en familjesemester eller ett äventyr med vänner, har vi något för alla.</p>
          <br/>

          <p className="text-xl underline leading-loose mb-2">Vad vi erbjuder:</p>
            <ul className="space-y-4">
          <li><strong className="leading-loose">Unika boenden:</strong> <br/>Från charmiga stugor och moderna lägenheter till lyxiga villor, våra boenden är noggrant utvalda för att ge dig en minnesvärd upplevelse.</li>
          <li><strong className="leading-loose">Flexibilitet och bekvämlighet:</strong> <br/> Vår användarvänliga plattform gör det enkelt att söka, boka och hantera ditt boende. Utforska detaljerade listor med bilder, beskrivningar och recensioner från tidigare gäster.</li>
          <li><strong className="leading-loose">Personlig service: </strong> <br/>Vi är här för att hjälpa dig. Kontakta våra värdar för att ställa frågor eller få rekommendationer för din vistelse. Vårt mål är att göra din resa så smidig och njutbar som möjligt.</li>
          </ul>
          <br/>

          <p className="text-xl underline leading-loose mb-2">Bli värd idag!</p> 
          <p >Vill du dela din plats med resenärer? LairBnb ger dig möjlighet att enkelt lägga upp ditt boende och nå en bred publik av potentiella gäster. Tillsammans kan vi skapa oförglömliga minnen!</p>
          <br/>
          <p className="italic">Upptäck världen med LairBnb och boka din nästa vistelse idag. Vare sig du söker avkoppling eller äventyr, är vi här för att hjälpa dig att hitta den perfekta platsen att kalla hem under din resa. Välkommen till vår gemenskap av resenärer och värdar!</p>
            </div>
        </article>
       <hr /> 
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
  <Card className="bg-white shadow-md rounded-lg overflow-hidden">
    <CardContent className="p-4 flex flex-col h-full"> {/* Flex layout här */}
      <h2 className="font-semibold text-xl mb-2">Lägg upp ditt boende på LairBnb</h2>
      <img
        src="https://images.pexels.com/photos/276724/pexels-photo-276724.jpeg"
        alt="Varför ska jag lägga upp mitt boende?"
        className="w-full h-50 object-cover"
      />
      <p className="text-gray-600 mb-4 flex-grow"> {/* Flex-grow gör att texten tar upp utrymme */}
        Dela din unika plats och nå fler gäster! Genom att lägga upp ditt boende på vår plattform får du exponering till en bredare publik av resenärer som söker efter unika och minnesvärda upplevelser. Tillsammans kan vi göra ditt boende till deras nästa favoritdestination!
      </p>
      <div className="mt-auto"> {/* Behåll knappen liten genom att lägga den i en separat div */}
        <Button className="mt-4">Lägg till BnB</Button>
      </div>
    </CardContent>
  </Card>

  <Card className="bg-white shadow-md rounded-lg overflow-hidden" style={{ height: 'auto', width: '100%' }}>
    <CardContent className="p-4 flex flex-col h-full">
      <h2 className="font-semibold text-xl mb-2">LairBnb hjälper dig hela vägen</h2>
      <img
        src="https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg"
        alt="Hur LairBnb hjälper"
        className="w-full h-50 object-cover"
      />
      <p className="text-gray-600 mb-4 flex-grow">
        Vår plattform är designad för att förenkla din uthyrningsprocess. Med lättanvända verktyg kan du enkelt hantera bokningar, kommunicera med gäster och få insikter om din verksamhet. Låt oss hjälpa dig att maximera din uthyrning och skapa fantastiska minnen för dina gäster!
      </p>
      <div className="mt-auto">
        <Button className="mt-4">Kontakta oss</Button>
      </div>
    </CardContent>
  </Card>

  <Card className="bg-white shadow-md rounded-lg overflow-hidden" style={{ height: 'auto', width: '100%' }}>
    <CardContent className="p-4 flex flex-col h-full">
      <h2 className="font-semibold text-xl mb-2">Upptäck nya upplevelser</h2>
      <img
        src="https://unsplash.com/photos/low-angle-photography-of-two-men-playing-beside-two-women-UmV2wr-Vbq8"
        alt="Upptäck nya upplevelser"
        className="w-full h-50 object-cover"
      />
      <p className="text-gray-600 mb-4 flex-grow">
        Upptäck din nästa äventyrsplats med oss! Oavsett om du är på jakt efter en avkopplande helg eller ett spännande äventyr, har vi ett brett utbud av boenden som passar alla smaker och budgetar. Låt oss hjälpa dig att skapa oförglömliga minnen med dina nära och kära!
      </p>
      <div className="mt-auto">
        <Button className="mt-4">Boka nu</Button>
      </div>
    </CardContent>
  </Card>
</div>


    </div>
    </>
  );
}
