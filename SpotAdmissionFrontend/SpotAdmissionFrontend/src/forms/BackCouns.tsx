// {/* --------------------------------------------------------------------- */}
//           {/* SECTION 4 */}
//           {/* --------------------------------------------------------------------- */}
//           <section className="p-4 rounded-xl border">
//             <h2 className="font-semibold text-lg mb-3">Section 4: Behavioral & Emotional Profile</h2>

//             <div className="grid grid-cols-1 md:grid-cols-3 gap-4">

//               <label>
//                 <span>Behavior</span>
//                 <select
//                   value={form.behavior}
//                   onChange={(e) => update("behavior", e.target.value as any)}
//                   className="mt-1 p-2 border border-primary-500 rounded-md w-full 
//                    focus:ring-primary-500 focus:border-primary-600"
//                 >
//                   <option value="">Select</option>
//                   <option>Cooperative</option>
//                   <option>Quiet</option>
//                   <option>Hyperactive</option>
//                   <option>Distracted</option>
//                   <option>Aggressive</option>
//                 </select>
//               </label>

//               <label>
//                 <span>Social Interaction</span>
//                 <select
//                   value={form.social}
//                   onChange={(e) => update("social", e.target.value as any)}
//                   className="mt-1 p-2 border border-primary-500 rounded-md w-full 
//                    focus:ring-primary-500 focus:border-primary-600"
//                 >
//                   <option value="">Select</option>
//                   <option>Friendly</option>
//                   <option>Shy</option>
//                   <option>Prefers Isolation</option>
//                   <option>Seeks Attention</option>
//                 </select>
//               </label>

//               <label>
//                 <span>Emotional State</span>
//                 <select
//                   value={form.emotional}
//                   onChange={(e) => update("emotional", e.target.value as any)}
//                   className="mt-1 p-2 border border-primary-500 rounded-md w-full 
//                    focus:ring-primary-500 focus:border-primary-600"
//                 >
//                   <option value="">Select</option>
//                   <option>Happy</option>
//                   <option>Anxious</option>
//                   <option>Sad</option>
//                   <option>Irritable</option>
//                   <option>Withdrawn</option>
//                 </select>
//               </label>

//               <label className="md:col-span-3">
//                 <span>Incidents / Concerns</span>
//                 <textarea
//                   value={form.incidents}
//                   onChange={(e) => update("incidents", e.target.value)}
//                   className="mt-1 p-2 border border-primary-500 rounded-md w-full 
//                    focus:ring-primary-500 focus:border-primary-600"
//                 />
//               </label>
//             </div>
//           </section>

//           {/* --------------------------------------------------------------------- */}
//           {/* SECTION 5 */}
//           {/* --------------------------------------------------------------------- */}
//           <section className="p-4 rounded-xl border">
//             <h2 className="font-semibold text-lg mb-3">Section 5: Counseling Details</h2>

//             <label className="block">
//               <span>Type of Counseling Required</span>
//               <div className="flex flex-wrap gap-2 mt-2">
//                 {[
//                   "Academic Guidance",
//                   "Behavioral Counseling",
//                   "Emotional Support",
//                   "Career Guidance",
//                   "Parental/Family Issues",
//                   "Peer Relationships",
//                 ].map((c) => (
//                   <button
//                     key={c}
//                     type="button"
//                     onClick={() => toggleArray("counselingTypes", c)}
//                     className={`px-3 py-1 rounded-full border ${form.counselingTypes.includes(c) ? "bg-amber-500 text-white" : ""
//                       }`}
//                   >
//                     {c}
//                   </button>
//                 ))}
//               </div>
//             </label>

//             <label className="block">
//               <span>Reason</span>
//               <textarea
//                 value={form.reason}
//                 onChange={(e) => update("reason", e.target.value)}
//                 className="mt-1 p-2 border border-primary-500 rounded-md w-full 
//                    focus:ring-primary-500 focus:border-primary-600"
//               />
//             </label>

//             <label className="block">
//               <span>Student’s Expectations</span>
//               <textarea
//                 value={form.expectations}
//                 onChange={(e) => update("expectations", e.target.value)}
//                 className="mt-1 p-2 border border-primary-500 rounded-md w-full 
//                    focus:ring-primary-500 focus:border-primary-600"
//               />
//             </label>
//           </section>

//           {/* --------------------------------------------------------------------- */}
//           {/* SECTION 6 */}
//           {/* --------------------------------------------------------------------- */}
//           <section className="p-4 rounded-xl border">
//             <h2 className="font-semibold text-lg mb-3">Section 6: Counselor Observation</h2>

//             <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

//               <label>
//                 <span>Date</span>
//                 <input
//                   type="date"
//                   value={form.counselingDate}
//                   onChange={(e) => update("counselingDate", e.target.value)}
//                   className="mt-1 p-2 border border-primary-500 rounded-md w-full 
//                    focus:ring-primary-500 focus:border-primary-600"
//                 />
//               </label>

//               <label>
//                 <span>Counselor Name</span>
//                 <input
//                   value={form.counselorName}
//                   onChange={(e) => update("counselorName", e.target.value)}
//                   className="mt-1 p-2 border border-primary-500 rounded-md w-full 
//                    focus:ring-primary-500 focus:border-primary-600"
//                 />
//               </label>

//               <label className="md:col-span-2">
//                 <span>Observations</span>
//                 <textarea
//                   value={form.observations}
//                   onChange={(e) => update("observations", e.target.value)}
//                   className="mt-1 p-2 border border-primary-500 rounded-md w-full 
//                    focus:ring-primary-500 focus:border-primary-600"
//                 />
//               </label>

//               <label className="md:col-span-2">
//                 <span>Recommendations</span>
//                 <div className="flex flex-wrap gap-2 mt-2">
//                   {[
//                     "Regular Follow-up",
//                     "Parent Meeting",
//                     "Teacher Support",
//                     "Academic Plan",
//                     "Peer Counseling",
//                     "Referral to Psychologist",
//                   ].map((r) => (
//                     <button
//                       key={r}
//                       type="button"
//                       onClick={() => toggleArray("recommendations", r)}
//                       className={`px-3 py-1 rounded-full border ${form.recommendations.includes(r)
//                         ? "bg-green-600 text-white"
//                         : ""
//                         }`}
//                     >
//                       {r}
//                     </button>
//                   ))}
//                 </div>
//               </label>
//             </div>
//           </section>
