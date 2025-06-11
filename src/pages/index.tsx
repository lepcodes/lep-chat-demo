import Head from 'next/head';
import Chat from 'lep-chat';
import 'lep-chat/dist/style.css';

async function getResponse(question: string): Promise<string> {
  try {
    const response = await fetch("/api/response", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ question }),
    });

    const data = await response.json();
    return data.response;
  } catch (error) {
    console.error("Error fetching data:", error);
    return "Error fetching data";
  }
};

export default function Home() {
  return (
    <>
      <Head>
        <title>Fitness AI</title>
        <meta name="description" content="FitAI is a personalized fitness chatbot that helps you achieve your fitness goals." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main style={{ display: 'flex', justifyContent: 'center', height: '100vh' }}>
        <Chat 
          onGetResponse={getResponse}
          placeHolder="Ask me anything..."
          className="flex-1 flex flex-col items-center justify-center"
          overline="Ready to Sweat? 🔥"
          title="Personal"
          highlightedText="Fitness AI"
          gradient={['#F09819', '#EDDE5D']}
          subtitle="Tell me your fitness goal, and I'll generate a personalized workout plan to get you started."
        />
      </main>
    </>
  );
}
