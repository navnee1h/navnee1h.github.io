import { useEffect } from 'react';
import 'tailwindcss/tailwind.css';
import '../styles/index.css';

function MyApp({ Component, pageProps }) {
  useEffect(() => {
    const sendVisitorInfoToDiscord = async () => {
      const lastPing = localStorage.getItem('lastDiscordPing');
      const now = Date.now();

      // 15 minutes = 900000 milliseconds
      if (lastPing && now - parseInt(lastPing) < 900000) {
        console.log('Visitor ping skipped (sent less than 15 minutes ago)');
        return;
      }

      try {
        const res = await fetch('https://ipapi.co/json/');
        const data = await res.json();

        const message = {
          content: `📥 **New Visitor**
🌐 IP: ${data.ip}
📍 Location: ${data.city}, ${data.region}, ${data.country_name}
🕒 Time: ${new Date().toLocaleString()}
🖥️ User-Agent: ${navigator.userAgent}`,
        };

        await fetch('https://discord.com/api/webhooks/1378413991495467113/5_aHbsFhkPcaRuvh0Y6AVu1CfIPsIh6oWvqjqh_MZBrHTrGCe2iqL_aKI44-vs1CYS_A', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(message),
        });

        localStorage.setItem('lastDiscordPing', now.toString());
      } catch (error) {
        console.error('Visitor tracking failed:', error);
      }
    };

    sendVisitorInfoToDiscord();
  }, []);

  return <Component {...pageProps} />;
}

export default MyApp;
