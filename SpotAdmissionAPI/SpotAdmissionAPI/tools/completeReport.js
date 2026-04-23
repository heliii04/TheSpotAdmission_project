const fetch = global.fetch || require('node-fetch');
const fs = require('fs');
const base = 'http://localhost:5000';

async function req(path, options = {}){
  try{
    const res = await fetch(base + path, options);
    const text = await res.text();
    let body;
    try{ body = JSON.parse(text); } catch(e){ body = text; }
    return { status: res.status, body };
  } catch(err){ return { error: err.message } }
}

(async ()=>{
  const report = { meta: { base }, results: [] };

  // create user and admin
  const userEmail = `user_${Date.now()}@example.com`;
  const adminEmail = `admin_${Date.now()}@example.com`;

  report.results.push({ action: 'register_user', email: userEmail, res: await req('/auth/register', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ name: 'User', email: userEmail, password: 'Pass1234' }) }) });
  report.results.push({ action: 'register_admin', email: adminEmail, res: await req('/auth/register', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ name: 'Admin', email: adminEmail, password: 'AdminPass123', role: 'admin' }) }) });

  const loginUser = await req('/auth/login', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ email: userEmail, password: 'Pass1234' }) });
  const loginAdmin = await req('/auth/login', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ email: adminEmail, password: 'AdminPass123' }) });
  const userToken = loginUser.body && loginUser.body.token ? loginUser.body.token : null;
  const adminToken = loginAdmin.body && loginAdmin.body.token ? loginAdmin.body.token : null;
  report.results.push({ action: 'login_user', res: loginUser });
  report.results.push({ action: 'login_admin', res: loginAdmin });

  // helper to auth
  const auth = (token)=> ({ headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` } });

  // resources to test
  // 1) School (admin)
  let r = await req('/school', { method: 'POST', headers: auth(adminToken).headers, body: JSON.stringify({ name: 'Test School', overview: 'test' }) });
  report.results.push({ action: 'create_school', res: r });
  const schoolId = r.body && r.body._id ? r.body._id : null;
  if (schoolId){
    report.results.push({ action: 'update_school', res: await req(`/school/${schoolId}`, { method: 'PUT', headers: auth(adminToken).headers, body: JSON.stringify({ overview: 'updated' }) }) });
    report.results.push({ action: 'get_school', res: await req(`/school/${schoolId}`) });
    report.results.push({ action: 'delete_school', res: await req(`/school/${schoolId}`, { method: 'DELETE', headers: auth(adminToken).headers }) });
  }

  // 2) College (admin)
  r = await req('/college', { method: 'POST', headers: auth(adminToken).headers, body: JSON.stringify({ location: 'City' }) });
  report.results.push({ action: 'create_college', res: r });
  const collegeId = r.body && r.body._id ? r.body._id : null;
  if (collegeId){
    report.results.push({ action: 'update_college', res: await req(`/college/${collegeId}`, { method: 'PUT', headers: auth(adminToken).headers, body: JSON.stringify({ location: 'Town' }) }) });
    report.results.push({ action: 'get_college', res: await req(`/college/${collegeId}`) });
    report.results.push({ action: 'delete_college', res: await req(`/college/${collegeId}`, { method: 'DELETE', headers: auth(adminToken).headers }) });
  }

  // 3) Video (admin)
  r = await req('/video', { method: 'POST', headers: auth(adminToken).headers, body: JSON.stringify({ title: 'V1', url: 'http://video' }) });
  report.results.push({ action: 'create_video', res: r });
  const videoId = r.body && r.body._id ? r.body._id : null;
  if (videoId){
    report.results.push({ action: 'update_video', res: await req(`/video/${videoId}`, { method: 'PUT', headers: auth(adminToken).headers, body: JSON.stringify({ title: 'V1-upd' }) }) });
    report.results.push({ action: 'get_video', res: await req(`/video/${videoId}`) });
    report.results.push({ action: 'delete_video', res: await req(`/video/${videoId}`, { method: 'DELETE', headers: auth(adminToken).headers }) });
  }

  // 4) Content (admin)
  r = await req('/content', { method: 'POST', headers: auth(adminToken).headers, body: JSON.stringify({ title: 'C1', content: 'x' }) });
  report.results.push({ action: 'create_content', res: r });
  const contentId = r.body && r.body._id ? r.body._id : null;
  if (contentId){
    report.results.push({ action: 'update_content', res: await req(`/content/${contentId}`, { method: 'PUT', headers: auth(adminToken).headers, body: JSON.stringify({ content: 'y' }) }) });
    report.results.push({ action: 'get_content', res: await req(`/content/${contentId}`) });
    report.results.push({ action: 'delete_content', res: await req(`/content/${contentId}`, { method: 'DELETE', headers: auth(adminToken).headers }) });
  }

  // 5) Podcast (admin)
  r = await req('/podcast', { method: 'POST', headers: auth(adminToken).headers, body: JSON.stringify({ title: 'P1' }) });
  report.results.push({ action: 'create_podcast', res: r });
  const podcastId = r.body && r.body._id ? r.body._id : null;
  if (podcastId){
    report.results.push({ action: 'update_podcast', res: await req(`/podcast/${podcastId}`, { method: 'PUT', headers: auth(adminToken).headers, body: JSON.stringify({ title: 'P1u' }) }) });
    report.results.push({ action: 'get_podcast', res: await req(`/podcast/${podcastId}`) });
    report.results.push({ action: 'delete_podcast', res: await req(`/podcast/${podcastId}`, { method: 'DELETE', headers: auth(adminToken).headers }) });
  }

  // 6) Testimonial (admin)
  r = await req('/testimonial', { method: 'POST', headers: auth(adminToken).headers, body: JSON.stringify({ name: 'T1', message: 'ok' }) });
  report.results.push({ action: 'create_testimonial', res: r });
  const testimonialId = r.body && r.body._id ? r.body._id : null;
  if (testimonialId){
    report.results.push({ action: 'update_testimonial', res: await req(`/testimonial/${testimonialId}`, { method: 'PUT', headers: auth(adminToken).headers, body: JSON.stringify({ message: 'up' }) }) });
    report.results.push({ action: 'get_testimonial', res: await req(`/testimonial/${testimonialId}`) });
    report.results.push({ action: 'delete_testimonial', res: await req(`/testimonial/${testimonialId}`, { method: 'DELETE', headers: auth(adminToken).headers }) });
  }

  // 7) Admission (user)
  r = await req('/admission', { method: 'POST', headers: auth(userToken).headers, body: JSON.stringify({ name: 'Ad1' }) });
  report.results.push({ action: 'create_admission', res: r });
  const admissionId = r.body && r.body._id ? r.body._id : null;
  if (admissionId){
    report.results.push({ action: 'update_admission', res: await req(`/admission/${admissionId}`, { method: 'PUT', headers: auth(userToken).headers, body: JSON.stringify({ status: 'complete' }) }) });
    report.results.push({ action: 'get_admission', res: await req(`/admission/${admissionId}`, { headers: auth(userToken).headers }) });
    report.results.push({ action: 'delete_admission', res: await req(`/admission/${admissionId}`, { method: 'DELETE', headers: auth(userToken).headers }) });
  }

  // 8) AdmissionForm (public)
  r = await req('/admissionform', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ email: userEmail }) });
  report.results.push({ action: 'create_admissionform', res: r });
  const admissionFormId = r.body && r.body._id ? r.body._id : null;
  if (admissionFormId){
    report.results.push({ action: 'update_admissionform', res: await req(`/admissionform/${admissionFormId}`, { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ email: 'upd@example.com' }) }) });
    report.results.push({ action: 'delete_admissionform', res: await req(`/admissionform/${admissionFormId}`, { method: 'DELETE' }) });
  }

  // 9) CounselingForm (public)
  r = await req('/counselingform', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ email: userEmail }) });
  report.results.push({ action: 'create_counselingform', res: r });
  const counselingFormId = r.body && r.body._id ? r.body._id : null;
  if (counselingFormId){
    report.results.push({ action: 'update_counselingform', res: await req(`/counselingform/${counselingFormId}`, { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ email: 'upd2@example.com' }) }) });
    report.results.push({ action: 'delete_counselingform', res: await req(`/counselingform/${counselingFormId}`, { method: 'DELETE' }) });
  }

  // 10) Counselling booking (protected)
  r = await req('/counselling', { method: 'POST', headers: auth(userToken).headers, body: JSON.stringify({ studentName: 'S1' }) });
  report.results.push({ action: 'create_counselling_booking', res: r });
  const bookingId = r.body && r.body._id ? r.body._id : null;
  if (bookingId){
    report.results.push({ action: 'update_counselling_booking', res: await req(`/counselling/${bookingId}`, { method: 'PUT', headers: auth(userToken).headers, body: JSON.stringify({ status: 'confirmed' }) }) });
    report.results.push({ action: 'get_counselling_booking', res: await req(`/counselling/${bookingId}`, { headers: auth(userToken).headers }) });
    report.results.push({ action: 'delete_counselling_booking', res: await req(`/counselling/${bookingId}`, { method: 'DELETE', headers: auth(userToken).headers }) });
  }

  // 11) CareerForm, PersonalizedCounselingForm, PrePrimaryForm (public)
  const miscForms = [
    { path: '/careerform', body: { email: userEmail } },
    { path: '/personalizedcounselingform', body: { email: userEmail } },
    { path: '/preprimaryform', body: { email: userEmail } },
  ];
  for (const f of miscForms){
    r = await req(f.path, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(f.body) });
    report.results.push({ action: `create_${f.path.replace('/','')}`, res: r });
    const id = r.body && r.body._id ? r.body._id : null;
    if (id){
      report.results.push({ action: `update_${f.path.replace('/','')}`, res: await req(`${f.path}/${id}`, { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ email: 'upd@example.com' }) }) });
      report.results.push({ action: `delete_${f.path.replace('/','')}`, res: await req(`${f.path}/${id}`, { method: 'DELETE' }) });
    }
  }

  // write report
  fs.writeFileSync('tools/report.json', JSON.stringify(report, null, 2));
  console.log('Report written to tools/report.json');
  console.log(JSON.stringify(report, null, 2));
})();
