import { spawn } from 'child_process';
import http from 'http';
import fs from 'fs';
import path from 'path';

const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const chrome = spawn(chromePath, [
  '--headless=new',
  '--remote-debugging-port=9222',
  '--no-sandbox',
  '--disable-gpu',
  '--disable-background-networking',
  'about:blank',
]);

async function checkPort() {
  for (let i = 0; i < 20; i++) {
    try {
      const res = await fetch('http://127.0.0.1:9222/json/version');
      if (res.ok) {
        const data = await res.json();
        console.log('Connected to Chrome:', data['User-Agent']);
        return;
      }
    } catch (e) {
      await new Promise(r => setTimeout(r, 200));
    }
  }
  throw new Error('Could not connect to Chrome port 9222');
}

checkPort().then(() => {
  chrome.kill();
  console.log('Test successful, killed Chrome.');
}).catch(err => {
  chrome.kill();
  console.error(err);
});
