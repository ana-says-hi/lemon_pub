const {db} = require('../config/firebase');
const puppeteer = require('puppeteer');

async function saveAgentsToFirestore(agents) {
  const batch = db.batch(); // Batch writing, faster!

  agents.forEach(agent => {
    const docRef = db.collection('agents').doc(); // Auto-generate ID
    batch.set(docRef, {
      name: agent.name,
      genres: agent.genres,
      profileLink: agent.profileLink,
      //createdAt: admin.firestore.FieldValue.serverTimestamp()
    });
  });

  try {
    await batch.commit();
    console.log(`Successfully saved ${agents.length} agents to Firestore.`);
  } catch (error) {
    console.error('Error saving agents to Firestore:', error);
  }
}


async function scrapeMSWL() {
  const browser = await puppeteer.launch({headless: true});
  const page = await browser.newPage();
  let allAgents = [];

  //let urls = ['https://www.manuscriptwishlist.com/find-agentseditors/agent-list/']
  for (let i = 1; i <= 60; i++) {
    url = `https://www.manuscriptwishlist.com/find-agentseditors/agent-list/?wpv_view_count=48&wpv_paged=${i}/`;
    console.log('Scraping MSWL page ' + i + '...');

    await page.goto(url, {waitUntil: 'networkidle2'});

    const agentsOnPage = await page.evaluate(() => {
      const rows = Array.from(document.querySelectorAll('table tbody tr'));
      return rows.map(row => {
        const name = row.querySelector('td a')?.innerText.trim();
        const profileLink = row.querySelector('td a')?.href;

        const secondCell = row.querySelector('td:nth-child(2)');
        let genres = null;
        // let publication = null;

        if (secondCell) {
          const text = secondCell.innerText.trim().toLowerCase();
          const match = text.match(/(?:non[- ]?fiction|fiction)[\s:]*([\s\S]*)/i);
          if (match && match[1]) {
            genres = match[1].trim();
          }
          // if (genres && typeof genres === 'string') {
          //   genres = genres.replace(/\n\s*\b(non-?fiction):/i, ',');
          // }
          genres = 'fiction: ' + genres
        }
        console.log('Genres:', genres);
        return name ? {name, genres, profileLink} : null; //TODO evetual adaugat si publication
      }).filter(Boolean);
    });
    console.log(`Found ${agentsOnPage.length} agents on MSWL.`);

    if (agentsOnPage.length === 0) {
      console.log('No more agents found, stopping the scrape.');
      break;
    }
    // for (const agent of agentsOnPage) {
    //   if (agent.profileLink) {
    //     try {
    //       await page.goto(agent.profileLink, {waitUntil: 'networkidle2'});
    //       // await page.waitFor(1000);
    //       //await page.waitForTimeout(1000);
    //
    //       const details = await page.evaluate(() => {
    //         const paragraphs = document.querySelectorAll('.entry-content p');
    //         const bioDetail = Array.from(paragraphs).map(p => p.innerText.trim()).join('\n');
    //         return {
    //           detailedBio: bioDetail || null
    //         };
    //       });
    //
    //       Object.assign(agent, details);
    //     } catch (err) {
    //       console.error('Failed to scrape agent profile:', agent.name, err);
    //     }
    //   }
    //   //saveAgentToFirestore(agent);
    // }
    await saveAgentsToFirestore(agentsOnPage);
    allAgents.push(...agentsOnPage);
  }
  console.log(`Total agents collected so far: ${allAgents.length}`);
  await browser.close();
}


async function scrapeQueryTracker() {
  const browser = await puppeteer.launch({headless: true});
  const page = await browser.newPage();

  console.log('Scraping QueryTracker...');

  // You need to be logged in to scrape a lot there. We'll scrape the public list.
  await page.goto('https://querytracker.net/literary_agents.php', {waitUntil: 'networkidle2'});

  const agents = await page.evaluate(() => {
    const rows = Array.from(document.querySelectorAll('table.agents tr'));
    return rows.map(row => {
      const name = row.querySelector('td a')?.innerText.trim();
      const profileLink = row.querySelector('td a')?.href;
      return name ? {name, profileLink} : null;
    }).filter(Boolean);
  });

  console.log(`Found ${agents.length} agents on QueryTracker.`);
  console.log(agents);

  await browser.close();
}

async function deleteAllAgents() {
  console.log('Starting delete all agents from Firestore...');
  const agentsRef = db.collection('agents');
  const snapshot = await agentsRef.get();

  if (snapshot.empty) {
    console.log('No agents to delete.');
    return;
  }
  const batch = db.batch();

  snapshot.docs.forEach(doc => {
    batch.delete(doc.ref);
  });

  try {
    await batch.commit();
    console.log(`Successfully deleted ${snapshot.size} agents.`);
  } catch (error) {
    console.error('Error deleting agents:', error);
  }
}

async function main() {
  await deleteAllAgents(); //cleanup inainte de noua salvare/reloading
  await scrapeMSWL();
  //await scrapeQueryTracker();
}

main();
