import { useEffect } from 'react';
import 'tailwindcss/tailwind.css';
import '../styles/index.css';

function MyApp({ Component, pageProps }) {
  useEffect(() => {
    const sendVisitorInfoToDiscord = async () => {
      try {
        // Get IP and location info
        const res = await fetch('https://ipapi.co/json/');
        const data = await res.json();

        // Prepare message
        const message = {
          content: `📥 **New Visitor**
🌐 IP: ${data.ip}
📍 Location: ${data.city}, ${data.region}, ${data.country_name}
🕒 Time: ${new Date().toLocaleString()}
🖥️ User-Agent: ${navigator.userAgent}`,
        };

        // Send to Discord webhook
        await fetch('https://discord.com/api/webhooks/1378413991495467113/5_aHbsFhkPcaRuvh0Y6AVu1CfIPsIh6oWvqjqh_MZBrHTrGCe2iqL_aKI44-vs1CYS_A', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(message),
        });
      } catch (error) {
        console.error('Visitor tracking failed:', error);
      }
    };

    sendVisitorInfoToDiscord();
  }, []);

  return <Component {...pageProps} />;
}

export default MyApp;
