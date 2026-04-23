const fetch = global.fetch || require('node-fetch');
const urls = [
  'http://localhost:5000/',
  'http://localhost:5000/podcast',
  'http://localhost:5000/content',
  'http://localhost:5000/testimonial',
  'http://localhost:5000/school',
  'http://localhost:5000/college',
  'http://localhost:5000/video',
  'http://localhost:5000/admission'
];

(async () => {
  for (const u of urls) {
    try {
      const res = await fetch(u);
      const text = await res.text();
      console.log('---', u, 'STATUS', res.status);
      console.log(text.slice(0, 400));
    } catch (err) {
      console.error('---', u, 'ERROR', err.message);
    }
  }
})();
