export const runtime = 'nodejs';


import fs from 'fs';
import path from 'path';
import Papa from 'papaparse';

export async function GET(req) {

    console.log('Reference file exists:', fs.existsSync(referenceFile));
console.log('Call file exists:', fs.existsSync(callFile));



  const referenceFile = path.join(process.cwd(), 'data/reference.csv');
  const callFile = path.join(process.cwd(), 'data/call_export.csv');

  const referenceCSV = fs.readFileSync(referenceFile, 'utf8');
  const callCSV = fs.readFileSync(callFile, 'utf8');

  const reference = Papa.parse(referenceCSV, { header: true }).data;
  const callExport = Papa.parse(callCSV, { header: true }).data;

  const normalize = (str) => str.toLowerCase().trim();
  const callNames = new Set(callExport.map(r => normalize(r.Name)));

  const attendance = reference.map(r => ({
    Name: r.Name,
    Email: r.Email,
    Present: callNames.has(normalize(r.Name)) ? 'YES' : 'NO',
  }));

  return new Response(JSON.stringify(attendance), {
    headers: { 'Content-Type': 'application/json' },
  });
}
