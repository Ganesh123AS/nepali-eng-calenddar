import { BaseMonthDaysByYear } from "./bsYear";

type BSDATE = { year: number; month: number; day: number };

const bsStartYear = 2070;
const bsStartMonth = 1;
const bsStartDay = 1;
const adStartDate = new Date("2013-04-14");

function pad(n: number): string {
  return n.toString().padStart(2, "0");
}
function formatDate(d: Date): string {
  return d.toISOString().split("T")[0];
}

const bsToAdMap: Map<string, string> = new Map();
const adToBsMap: Map<string, BSDATE> = new Map();

(function generateLookups() {
  let currentAD = new Date(adStartDate);
  let bsYear = bsStartYear;
  let bsMonth = bsStartMonth;
  let bsDay = bsStartDay;

  while (BaseMonthDaysByYear[bsYear]) {
    const monthDays = BaseMonthDaysByYear[bsYear];
    const daysInMonth = monthDays[bsMonth];

    const bsKey = `${bsYear}-${pad(bsMonth)}-${pad(bsDay)}`;
    const adKey = formatDate(currentAD);

    bsToAdMap.set(bsKey, adKey);
    adToBsMap.set(adKey, { year: bsYear, month: bsMonth, day: bsDay });

    bsDay++;
    if (bsDay > daysInMonth) {
      bsDay = 1;
      bsMonth++;
      if (bsMonth > 12) {
        bsMonth = 1;
        bsYear++;
      }
    }

    currentAD.setDate(currentAD.getDate() + 1);
  }
})();

export function convertBSToAD(bsYear: number, bsMonth: number, bsDay: number): string | undefined {
  return bsToAdMap.get(`${bsYear}-${pad(bsMonth)}-${pad(bsDay)}`);
}

export function convertADToBS(adDateStr: string): BSDATE | undefined {
  return adToBsMap.get(adDateStr);
}
