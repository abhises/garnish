import { getPayload } from 'payload';
import configPromise from '../src/payload.config';

async function seedAbletonLondon() {
  console.log('Connecting to Payload / Neon DB...');
  const payload = await getPayload({ config: configPromise });

  const slug = 'ableton-live-course-london';
  const title = 'Ableton Music Production & Performance Course';
  const duration = '120–360 Hours (Certificate & Tactical)';
  const price = '$1,495';

  const shortDescription = `Learn to produce and perform using Ableton Live in the world’s boutique music production school, with class sizes of no more than eight people, now with the option to pay in interest-free installments.<br><br>As well as being a perfect introduction for beginners, this course is suitable for intermediate self-taught Ableton users. You will learn how to improve your workflow, design sound and perform live with our team of active industry <a href="/instructors" class="underline font-semibold">instructors</a>.<br><br><em>“I needed to brush up on something, so I called Garnish, as they have the best instructors” – <a href="https://jamiejones.com/" target="_blank" rel="noopener" class="underline">Jamie Jones</a></em>`;

  const description = `
[mkd_accordion style="accordion"]
[mkd_accordion_tab title="Getting Started"]
<ul class="list-disc pl-6 space-y-1.5 text-slate-700">
  <li>Understanding your goals</li>
  <li>Getting set up: audio and the preferences window</li>
  <li>Session view vs. arrangement view: applications of each</li>
  <li>Live concepts: clips / scenes / browser / library</li>
  <li>Ableton’s unique warp engine</li>
  <li>Launching clips</li>
  <li>Intro to FX</li>
  <li>Intro to instruments</li>
</ul>
[/mkd_accordion_tab]

[mkd_accordion_tab title="Creating with Audio & MIDI"]
<ul class="list-disc pl-6 space-y-1.5 text-slate-700">
  <li>Warping in practice</li>
  <li>Quantising audio</li>
  <li>Clip view and clip properties</li>
  <li>Making beats with drum racks and simpler sampling</li>
  <li>Live’s effects</li>
  <li>Basic routing and resampling</li>
  <li>Creating dynamic changes in your arrangements</li>
</ul>
[/mkd_accordion_tab]

[mkd_accordion_tab title="Sound Engineering & Recording"]
<ul class="list-disc pl-6 space-y-1.5 text-slate-700">
  <li>Group tracks and advanced uses of routing</li>
  <li>Introduction to sound waves, frequency, and amplitude</li>
  <li>The recording patch in detail, introduction to gain structure</li>
  <li>EQ and compression for recording</li>
  <li>Foldback, headphone mixes, and latency</li>
  <li>Digital, analogue, sampling rate and bit-rate</li>
  <li>Overview of microphones and stereo techniques</li>
  <li>Recording specific aspects of Ableton</li>
  <li>Brand new Live audio-to-midi features</li>
</ul>
[/mkd_accordion_tab]

[mkd_accordion_tab title="MIDI & Virtual Instruments"]
<ul class="list-disc pl-6 space-y-1.5 text-slate-700">
  <li>Sampling using Simpler</li>
  <li>Drum rack</li>
  <li>Using and controlling third-party virtual instruments</li>
  <li>Grooves + groove extraction</li>
  <li>Setting up a MIDI keyboard or drum pad controllers</li>
  <li>Getting creative with MIDI effects</li>
</ul>
[/mkd_accordion_tab]

[mkd_accordion_tab title="DJ-ing & Live Performance"]
<ul class="list-disc pl-6 space-y-1.5 text-slate-700">
  <li>Preparing (warping) whole tracks and harmonic mixing</li>
  <li>DJ effects</li>
  <li>Using MIDI controllers effectively</li>
  <li>Push 2</li>
  <li>Grouping tracks and basic routing</li>
  <li>Structuring your sets and using loops</li>
  <li>Recording your performance</li>
  <li>Editing the arrangement view</li>
  <li>Bouncing your tracks</li>
</ul>
[/mkd_accordion_tab]

[mkd_accordion_tab title="Advanced Techniques"]
<ul class="list-disc pl-6 space-y-1.5 text-slate-700">
  <li>Advanced warping</li>
  <li>Multi-track warping</li>
  <li>Clip envelopes</li>
  <li>Using multiple automations</li>
  <li>Intro to racks & chains</li>
  <li>Mixing tips and techniques</li>
</ul>
[/mkd_accordion_tab]

[mkd_accordion_tab title="Additional Information"]
<ul class="list-disc pl-6 space-y-1.5 text-slate-700">
  <li>This course supports Ableton for PC & Mac.</li>
  <li>Use your own laptop, or use our studio iMacs free of charge.</li>
  <li>Headphones, controllers and Ableton Push are available to use.</li>
</ul>
<p class="mt-4 text-slate-700 leading-relaxed">
  We’re currently offering our short courses via private tuition — available in London, Cardiff, Manchester, Margate, Brighton, other select locations, and online. For details, visit our <a href="/bespoke-private-tuition" class="font-bold underline text-red-600">Private Tuition page</a>.
</p>
<p class="mt-3 text-slate-500 text-xs">
  <a href="https://www.ableton.com/en/certified-training/garnish-music-production-school/" target="_blank" rel="noopener" class="underline">Ableton Certified Training Center</a>
</p>
[/mkd_accordion_tab]
[/mkd_accordion]
  `.trim();

  const tenants = ['www', 'london', 'uk'];

  for (const tenant of tenants) {
    const existing = await payload.find({
      collection: 'courses',
      where: {
        and: [
          { slug: { equals: slug } },
          { tenant: { equals: tenant } },
        ],
      },
    });

    if (existing.docs.length > 0) {
      console.log(`Updating existing course for tenant "${tenant}" (ID: ${existing.docs[0].id})...`);
      await payload.update({
        collection: 'courses',
        id: existing.docs[0].id,
        data: {
          title,
          slug,
          tenant: tenant as any,
          duration,
          price,
          shortDescription,
          description,
        },
      });
    } else {
      console.log(`Creating new course for tenant "${tenant}"...`);
      await payload.create({
        collection: 'courses',
        data: {
          title,
          slug,
          tenant: tenant as any,
          duration,
          price,
          shortDescription,
          description,
        },
      });
    }
  }

  console.log('Seed completed successfully.');
  process.exit(0);
}

seedAbletonLondon().catch((err) => {
  console.error('Error seeding Ableton London:', err);
  process.exit(1);
});
