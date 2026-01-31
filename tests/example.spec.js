const { test, expect } = require("@playwright/test");

const SITE_URL = "https://www.swifttranslator.com/";


async function openSite(page) {
  await page.goto(SITE_URL, { waitUntil: "domcontentloaded" });
}

function getInputLocator(page) {
  return page.getByPlaceholder("Input Your Singlish Text Here.");
}

function getOutputLocator(page) {
  return page.locator('.card:has-text("Sinhala") .bg-slate-50').first();
}


async function readOutput(locator) {
  const t = await locator.textContent();
  return (t || "").replace(/\r\n/g, "\n");
}

function normalize(s) {
  return (s || "").replace(/\r\n/g, "\n").trim();
}

// --------- Test Data (Positive test data) ----------
const positiveCases = [
  {
    id: "Pos_Fun_0001",
    input: "aayuboovan! oyaata kohomadha?",
    expected: "ආයුබෝවන්! ඔයාට කොහොමද?"
  },
  {
    id: "Pos_Fun_0002",
    input: "adha mama gedhara inne.",
    expected: "අද මම ගෙදර ඉන්නේ."
  },
  {
    id: "Pos_Fun_0003",
    input: "karuNaakarala podi help ekak karanna puluvandha?",
    expected: "කරුණාකරල පොඩි help එකක් කරන්න පුලුවන්ද?"
  },{
    id: "Pos_Fun_0004",
    input: "vahaama enna!",
    expected: "වහාම එන්න!"
  },{
    id: "Pos_Fun_0005",
    input: "mama adha ennee naehae.",
    expected: "මම අද එන්නේ නැහැ."
  },{
    id: "Pos_Fun_0006",
    input: "api iiyee market giyaa.",
    expected: "අපි ඊයේ market ගියා."
  },{
    id: "Pos_Fun_0007",
    input: "api heta film ekak balamu.",
    expected: "අපි හෙට film එකක් බලමු."
  },{
    id: "Pos_Fun_0008",
    input: "oyaa maath ekka yanavadha?",
    expected: "ඔයා මාත් එක්ක යනවද?"
  },{
    id: "Pos_Fun_0009",
    input: "oyaalaa dhaen yamu.",
    expected: "ඔයාලා දැන් යමු."
  },
  {
    id: "Pos_Fun_0010",
    input: "mama class yanna haedhuvee, namuth vaessa nisaa bus eka late unaa.",
    expected: "මම class යන්න හැදුවේ, නමුත් වැස්ස නිසා bus එක late උනා."
  },
  {
    id: "Pos_Fun_0011",
    input: "oyaa enavanam api cafe ekata yamu, nathnam gedhara imu.",
    expected: "ඔයා එනවනම් අපි cafe එකට යමු, නත්නම් ගෙදර ඉමු."
  },
  {
    id: "Pos_Fun_0012",
    input: "meeka hariyata vaeda karanavadha? mata sure nae.",
    expected: "මේක හරියට වැඩ කරනවද? මට sure නැ."
  },
  {
    id: "Pos_Fun_0013",
    input: "hari hari, mama dhaenma ennam.",
    expected: "හරි හරි, මම දැන්ම එන්නම්."
  },
  {
    id: "Pos_Fun_0014",
    input: "mata paan kanna oone.",
    expected: "මට පාන් කන්න ඕනෙ."
  },
  {
    id: "Pos_Fun_0015",
    input: "api Colombo yamu, passe hotel ekee dinner gamu.",
    expected: "අපි Colombo යමු, පස්සෙ hotel එකේ dinner ගමු."
  },
  {
    id: "Pos_Fun_0016",
    input: "magee Zoom meeting eka 7.30 AM. link eka WhatsApp eken evanavadha?",
    expected: "මගේ Zoom meeting එක 7.30 AM. link එක WhatsApp එකෙන් එවනවද?"
  },
  {
    id: "Pos_Fun_0017",
    input: "documents tika attach karala email ekak evanna puluvandha?",
    expected: "documents ටික attach කරල email එකක් එවන්න පුලුවන්ද?"
  },
  {
    id: "Pos_Fun_0018",
    input: "adha bill eka Rs.5343 venna puluvan.",
    expected: "අද bill එක Rs.5343 වෙන්න පුලුවන්."
  },
  {
    id: "Pos_Fun_0019",
    input: "appointment eka 2026-05-21 dha? nathnam 25/12/2025 dha?",
    expected: "appointment එක 2026-05-21 ද? නත්නම් 25/12/2025 ද?"
  },
  {
    id: "Pos_Fun_0020",
    input: "mama adha office yanne late velaa.",
    expected: "මම අද office යන්නෙ late වෙලා."
  },
  {
    id: "Pos_Fun_0021",
    input: "kiri 250ml k dhaanna, saha sugar 10g k dhaanna.",
    expected: "කිරි 250ml ක් දාන්න, සහ sugar 10g ක් දාන්න."
  },{
    id: "Pos_Fun_0022",
    input: "mama adha gedhara inne./noyaa enavadha?",
    expected: "මම අද ගෙදර ඉන්නේ./නොයා එනවද?"
  },
  {
    id: "Pos_Fun_0023",
    input: "adha api trip eka plan kalaa. morning 8.00 AM ta pitath venna oone. ehenam bag tika ready karaganna. Kandy gihillaa lunch gaena hithamu, passe nuvara Eliye yanna puluvan. weather eka hodhayi nam photos ganna puluvan, naeththam cafe ekee poddak imu. fuel cost eka LKR 7000 vath venna puluvan. api fruits ganna balamu, saha water bottles 3k vithara ganna ooni. yanna kalin Google Maps eken route eka check karala, parking place ehema hoyamu.",
    expected: "අද අපි trip එක plan කලා. morning 8.00 AM ට පිටත් වෙන්න ඕනෙ. එහෙනම් bag ටික ready කරගන්න. Kandy ගිහිල්ලා lunch ගැන හිතමු, පස්සෙ නුවර එලියෙ යන්න පුලුවන්. weather එක හොදයි නම් photos ගන්න පුලුවන්, නැත්තම් cafe එකේ පොඩ්ඩක් ඉමු. fuel cost එක LKR 7000 වත් වෙන්න පුලුවන්. අපි fruits ගන්න බලමු, සහ water bottles 3ක් විතර ගන්න ඕනි. යන්න කලින් Google Maps එකෙන් route එක check කරල, parking place එහෙම හොයමු."
  },
  

];

// --------- Test Data (Negative test data) ----------
const negativeCases = [
  {
    id: "Neg_Fun_0001",
    input: "mamagedharayanavaaoyaaennavada",
    expected: "මම ගෙදර යනවා ඔයා එනවද "
  },
  {
    id: "Neg_Fun_0002",
    input: "mta bath one api heta gedr yamu",
    expected: "මට බත් ඕනේ අපි හෙට ගෙදර යමු "
  },
   {
    id: "Neg_Fun_0003",
    input: "aneeeee mataa poddakk help karannaaaa puluvandha?",
    expected: "අනේ මට පොඩ්ඩක් help කරන්න පුලුවන්ද?"
  },
   {
    id: "Neg_Fun_0004",
    input: "oyaa enawada??? mata dan kiyanna!!!",
    expected: "ඔයා එනවද? මට දැන් කියන්න!"
  },
   {
    id: "Neg_Fun_0005",
    input: "mama adha 2ta gedhara yanna hadhanne oyaa 4ta enawada?",
    expected: "මම අද 2ට ගෙදර යන්න හදන්නෙ. ඔයා 4ට එනවද?"
  },
   {
    id: "Neg_Fun_0006",
    input: "mama    adha      gedhara     innee",
    expected: "මම අද ගෙදර ඉන්නේ"
  },
   {
    id: "Neg_Fun_0007",
    input: "MaMa ADha GeDhArA YaNnAvA",
    expected: "මම අද ගෙදර යනවා "
  },
   {
    id: "Neg_Fun_0008",
    input: "mata adha class yanna Please confirm the schedule. oyaa enawada?",
    expected: "මට අද class යන්න Please confirm the schedule. ඔයා එනවද?"
  },
   {
    id: "Neg_Fun_0009",
    input: "adha api trip eka plan kala... morning 7.30 AM depart wenna one./nKandy gihilla passe Nuwara Eliya yanna hithamu!!!/nfuel cost Rs. 5343 wenna puluvan   api passe   balamu",
    expected: "අද අපි trip එක plan කලා. morning 7.30 AM depart වෙන්න ඕනෙ./nKandy ගිහිල්ල පස්සෙ නුවර එලිය යන්න හිතමු!/nfuel cost Rs. 5343 වෙන්න පුලුවන්. අපි පස්සෙ බලමු."
  },
   {
    id: "Neg_Fun_00010",
    input: "mata baya nae naththam mata baya hithenawada?",
    expected: "මට බය නෑ නැත්නම් මට බය හිතෙනවද ?"
  },

  
];

// --------- Tests ----------
test("open swifttranslator", async ({ page }) => {
  await openSite(page);

  const pageTitle = await page.title();
  console.log("page title is:", pageTitle);

  await expect(page).toHaveURL(SITE_URL);
  await expect(page).toHaveTitle(/Translator/i);
});

test.describe("SwiftTranslator – Positive Functional", () => {
  for (const tc of positiveCases) {
    test(`${tc.id} – should match expected Sinhala output`, async ({ page }) => {
      await openSite(page);

      const inputArea = getInputLocator(page);
      const outputBox = getOutputLocator(page);

      await inputArea.waitFor({ state: "visible", timeout: 10000 });
      await inputArea.fill(tc.input);

      await expect
        .poll(async () => normalize(await readOutput(outputBox)), {
          timeout: 20000,
          message: `Output did not match for ${tc.id}`
        })
        .toBe(normalize(tc.expected));
    });
  }
});

test.describe("SwiftTranslator – Negative Functional", () => {
  for (const tc of negativeCases) {
    test(`${tc.id} – should match expected Sinhala output`, async ({ page }) => {
      await openSite(page);

      const inputArea = getInputLocator(page);
      const outputBox = getOutputLocator(page);

      await inputArea.waitFor({ state: "visible", timeout: 10000 });
      await inputArea.fill(tc.input);

      await expect
        .poll(async () => normalize(await readOutput(outputBox)), {
          timeout: 20000,
          message: `Output did not match for ${tc.id}`
        })
        .toBe(normalize(tc.expected));
    });
  }
});

test("Pos_UI_0001 – Clearing input clears Sinhala output immediately", async ({ page }) => {
  await openSite(page);

  const inputArea = getInputLocator(page);
  const outputBox = getOutputLocator(page);

  await inputArea.waitFor({ state: "visible", timeout: 10000 });

  
  await inputArea.fill("api heta hambemu.");

  
  await expect
    .poll(async () => normalize(await readOutput(outputBox)), {
      timeout: 20000,
      message: "No output produced"
    })
    .not.toBe("");

  
  await inputArea.fill("");

  
  await expect
    .poll(async () => normalize(await readOutput(outputBox)), {
      timeout: 15000,
      message: "Output did not clear after clearing the input"
    })
    .toBe("");
});
