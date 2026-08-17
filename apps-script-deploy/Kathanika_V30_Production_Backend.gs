/**
 * Kathanika Media V30 Production Backend
 * Single-file Google Apps Script deployment build.
 *
 * Deploy:
 * 1) Paste this entire file into Code.gs in a new standalone Apps Script project.
 * 2) Run setupDatabase().
 * 3) Run verifyProductionSetup().
 * 4) Deploy as Web App and use the /exec URL in the frontend.
 */

// ===== Config.gs =====
const KATHANIKA = Object.freeze({
  API_VERSION: '30.0.0',
  DATABASE_NAME: 'Kathanika_Website_DB',
  DEFAULT_NOTIFICATION_EMAIL: 'kathanikamedia@gmail.com',
  CACHE_KEY: 'kathanika_public_content_v30',
  CACHE_SECONDS: 300,
  DEFAULT_STATUS: 'New',
  SHEETS: Object.freeze({
    BUSINESS: 'Business_Inquiries',
    CAREER: 'Career_Inquiries',
    CHANNELS: 'Channels',
    VIDEOS: 'Video_Content',
    SETTINGS: 'Site_Settings',
    SERVICES: 'Services',
    ADMIN_LOG: 'Admin_Log',
    ERROR_LOG: 'Error_Log',
  }),
});

function getScriptConfig_() {
  const props = PropertiesService.getScriptProperties();
  return {
    spreadsheetId: props.getProperty('SPREADSHEET_ID') || '',
    notificationEmail: props.getProperty('NOTIFICATION_EMAIL') || KATHANIKA.DEFAULT_NOTIFICATION_EMAIL,
  };
}

/**
 * Optional operations helper if notification emails should go somewhere else.
 * The database itself is still created only by setupDatabase().
 */
function setNotificationEmail(email) {
  const normalized = String(email || '').trim().toLowerCase();
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(normalized)) {
    throw new Error('A valid notification email is required.');
  }
  PropertiesService.getScriptProperties().setProperty('NOTIFICATION_EMAIL', normalized);
  return { ok: true, notificationEmail: normalized };
}

// ===== SeedData.gs =====
const KATHANIKA_SEED = Object.freeze({
  "settings": [
    {
      "key": "whatsappNumber",
      "value": "919063854291",
      "type": "string"
    },
    {
      "key": "email",
      "value": "kathanikamedia@gmail.com",
      "type": "string"
    },
    {
      "key": "phone",
      "value": "+91 90638 54291",
      "type": "string"
    },
    {
      "key": "addressLine",
      "value": "Kathanika Media Office, 3rd Floor, Opp. Swathi Multi-speciality, Road No. 10, Gouri Shankar Nagar Colony, Banjara Hills, Hyderabad, Telangana 500034",
      "type": "string"
    },
    {
      "key": "mapsUrl",
      "value": "https://maps.google.com/?q=Kathanika+Media+Office+Road+No+10+Gouri+Shankar+Nagar+Colony+Banjara+Hills+Hyderabad+Telangana+500034",
      "type": "string"
    },
    {
      "key": "cities",
      "value": "[\"Hyderabad\",\"Bengaluru\",\"Chennai\",\"Mumbai\",\"Delhi\"]",
      "type": "json"
    },
    {
      "key": "metrics",
      "value": "[{\"value\":\"8–12\",\"label\":\"Active content channels\"},{\"value\":\"10+\",\"label\":\"Brands every month\"},{\"value\":\"3+ Cr\",\"label\":\"Monthly content reach\"},{\"value\":\"10+\",\"label\":\"Doctors worked with monthly\"},{\"value\":\"1.5+ yrs\",\"label\":\"Of continuous execution\"},{\"value\":\"5\",\"label\":\"Major Indian cities\"}]",
      "type": "json"
    },
    {
      "key": "youtube",
      "value": "https://www.youtube.com/@kathanikamedia",
      "type": "string"
    },
    {
      "key": "instagram",
      "value": "https://instagram.com/kathanikamedia",
      "type": "string"
    },
    {
      "key": "linkedin",
      "value": "https://linkedin.com/company/kathanikamedia",
      "type": "string"
    }
  ],
  "services": [
    {
      "id": "s-1",
      "order": 1,
      "title": "Content as a Service",
      "description": "An always-on content engine, run end to end by Kathanika."
    },
    {
      "id": "s-2",
      "order": 2,
      "title": "Reels as a Service",
      "description": "High-volume short-form, cut from work you already own."
    },
    {
      "id": "s-3",
      "order": 3,
      "title": "Podcast as a Service",
      "description": "Studio, production, edit, publishing and clip strategy."
    },
    {
      "id": "s-4",
      "order": 4,
      "title": "YouTube as a Service",
      "description": "Channel architecture, formats, packaging and consistency."
    },
    {
      "id": "s-5",
      "order": 5,
      "title": "End-to-End Production",
      "description": "Crew, direction, cameras, sound, art and post."
    },
    {
      "id": "s-6",
      "order": 6,
      "title": "Social Media Management",
      "description": "Calendars, community and channel-native craft."
    },
    {
      "id": "s-7",
      "order": 7,
      "title": "Distribution & Audience Growth",
      "description": "Getting the work in front of the people who matter."
    },
    {
      "id": "s-8",
      "order": 8,
      "title": "IP Development",
      "description": "Turning a format idea into an ownable media property."
    },
    {
      "id": "s-9",
      "order": 9,
      "title": "Brand Building",
      "description": "Positioning and narrative that survives the scroll."
    },
    {
      "id": "s-10",
      "order": 10,
      "title": "Personal Branding",
      "description": "For founders, doctors, executives and industry leaders."
    }
  ],
  "channels": [
    {
      "id": "kaushik-and-co",
      "name": "Kaushik and Co",
      "slug": "kaushik-and-co",
      "active": true,
      "order": 1,
      "videos": [
        {
          "rank": 1,
          "coverUrl": "/top-ten/kaushik-and-co/1.jpg",
          "videoUrl": "https://youtu.be/bs6i7F588XY?si=5G6Pvlf70Tr4sN6r",
          "active": true,
          "order": 1
        },
        {
          "rank": 2,
          "coverUrl": "/top-ten/kaushik-and-co/2.jpg",
          "videoUrl": "https://youtu.be/ea8h9nEY7K8?si=5W2iFqxg6hmNPL_e",
          "active": true,
          "order": 2
        },
        {
          "rank": 3,
          "coverUrl": "/top-ten/kaushik-and-co/3.jpg",
          "videoUrl": "https://youtu.be/9w11J-cQY-k?si=sUcOOVHAgPqK820w",
          "active": true,
          "order": 3
        },
        {
          "rank": 4,
          "coverUrl": "/top-ten/kaushik-and-co/4.jpg",
          "videoUrl": "https://youtu.be/nTaiec-61N0?si=ki532XVUeVyR2WQ2",
          "active": true,
          "order": 4
        },
        {
          "rank": 5,
          "coverUrl": "/top-ten/kaushik-and-co/5.jpg",
          "videoUrl": "https://youtu.be/gUPysEbs1Io?si=N5dWb4P1FMYfi2W8",
          "active": true,
          "order": 5
        },
        {
          "rank": 6,
          "coverUrl": "/top-ten/kaushik-and-co/6.jpg",
          "videoUrl": "https://youtu.be/sxRpEoHzE-I?si=W8f9Bezb0LWG67RY",
          "active": true,
          "order": 6
        },
        {
          "rank": 7,
          "coverUrl": "/top-ten/kaushik-and-co/7.jpg",
          "videoUrl": "https://youtu.be/uuHAYF9EHa0?si=dAgLafxSLZHLXIxA",
          "active": true,
          "order": 7
        },
        {
          "rank": 8,
          "coverUrl": "/top-ten/kaushik-and-co/8.jpg",
          "videoUrl": "https://youtu.be/Vg3QMx9lNNw?si=ECw5qUc5IA-KbUxS",
          "active": true,
          "order": 8
        },
        {
          "rank": 9,
          "coverUrl": "/top-ten/kaushik-and-co/9.jpg",
          "videoUrl": "https://youtu.be/vEBuE9nBFns?si=IUnL1PRHpNn4cILT",
          "active": true,
          "order": 9
        },
        {
          "rank": 10,
          "coverUrl": "/top-ten/kaushik-and-co/10.jpg",
          "videoUrl": "https://youtu.be/jNU8QLa2s0k?si=8JpYRPyY6kW_Xbst",
          "active": true,
          "order": 10
        }
      ]
    },
    {
      "id": "a-dialogue-with-swathi",
      "name": "A Dialogue with swathi",
      "slug": "a-dialogue-with-swathi",
      "active": true,
      "order": 2,
      "videos": [
        {
          "rank": 1,
          "coverUrl": "/top-ten/a-dialogue-with-swathi/1.jpg",
          "videoUrl": "https://youtu.be/-VV-cx56S-4?si=QFB_27luNP9x-Hdu",
          "active": true,
          "order": 1
        },
        {
          "rank": 2,
          "coverUrl": "/top-ten/a-dialogue-with-swathi/2.jpg",
          "videoUrl": "https://youtu.be/D4n4OvFgkEY?si=Ko64w6_fS19AReKB",
          "active": true,
          "order": 2
        },
        {
          "rank": 3,
          "coverUrl": "/top-ten/a-dialogue-with-swathi/3.jpg",
          "videoUrl": "https://youtu.be/KBQJ06cskx0?si=iCpcBKEgOxw76-kN",
          "active": true,
          "order": 3
        },
        {
          "rank": 4,
          "coverUrl": "/top-ten/a-dialogue-with-swathi/4.jpg",
          "videoUrl": "https://youtu.be/G7iFXKnHG6U?si=FzJA_011mLQv49d4",
          "active": true,
          "order": 4
        },
        {
          "rank": 5,
          "coverUrl": "/top-ten/a-dialogue-with-swathi/5.jpg",
          "videoUrl": "https://youtu.be/1J9zqp6JVLo?si=PTe-6GntFXqmL6Ns",
          "active": true,
          "order": 5
        },
        {
          "rank": 6,
          "coverUrl": "/top-ten/a-dialogue-with-swathi/6.jpg",
          "videoUrl": "https://youtu.be/3WzDxMHOeXA?si=YUkGa-e7gA43wfQE",
          "active": true,
          "order": 6
        },
        {
          "rank": 7,
          "coverUrl": "/top-ten/a-dialogue-with-swathi/7.jpg",
          "videoUrl": "https://youtu.be/4EfyzhvJ6DY?si=1ObzO4Nc4aDiJY_Z",
          "active": true,
          "order": 7
        },
        {
          "rank": 8,
          "coverUrl": "/top-ten/a-dialogue-with-swathi/8.jpg",
          "videoUrl": "https://youtu.be/312bMyPj6ik?si=sBzdsvMRaPquajbq",
          "active": true,
          "order": 8
        },
        {
          "rank": 9,
          "coverUrl": "/top-ten/a-dialogue-with-swathi/9.jpg",
          "videoUrl": "https://youtu.be/dNCwR7qtIwQ?si=zYhK9T1dz7rLIJ83",
          "active": true,
          "order": 9
        },
        {
          "rank": 10,
          "coverUrl": "/top-ten/a-dialogue-with-swathi/10.jpg",
          "videoUrl": "https://youtu.be/ka1oobC_Q8w?si=i6ijdmLFj6TyeeP6",
          "active": true,
          "order": 10
        }
      ]
    },
    {
      "id": "politics-with-genz",
      "name": "Politics with Genz",
      "slug": "politics-with-genz",
      "active": true,
      "order": 3,
      "videos": [
        {
          "rank": 1,
          "coverUrl": "/top-ten/politics-with-genz/1.jpg",
          "videoUrl": "https://youtu.be/1W6tXhOkRU0?si=q_zHNgTo9ZCVHDLJ",
          "active": true,
          "order": 1
        },
        {
          "rank": 2,
          "coverUrl": "/top-ten/politics-with-genz/2.jpg",
          "videoUrl": "https://youtu.be/PtK9hBqDod0?si=ameiid8f-uuqncvE",
          "active": true,
          "order": 2
        },
        {
          "rank": 3,
          "coverUrl": "/top-ten/politics-with-genz/3.jpg",
          "videoUrl": "https://youtu.be/LzoE7gz8smE?si=U6KoCmiagZQWbIw6",
          "active": true,
          "order": 3
        },
        {
          "rank": 4,
          "coverUrl": "/top-ten/politics-with-genz/4.jpg",
          "videoUrl": "https://youtu.be/T3PDv-6HL1U?si=zy7vpLJpgC1So6R0",
          "active": true,
          "order": 4
        },
        {
          "rank": 5,
          "coverUrl": "/top-ten/politics-with-genz/5.jpg",
          "videoUrl": "https://youtu.be/pChQ3OzCv24?si=1HTnOORtrQuZKCLW",
          "active": true,
          "order": 5
        },
        {
          "rank": 6,
          "coverUrl": "/top-ten/politics-with-genz/6.jpg",
          "videoUrl": "https://youtu.be/j--zLGmBqvQ?si=ylh4eRnxaHXkbzNG",
          "active": true,
          "order": 6
        },
        {
          "rank": 7,
          "coverUrl": "/top-ten/politics-with-genz/7.jpg",
          "videoUrl": "https://youtu.be/j5-uqH6vDyI?si=qInUw3FbovBik0H3",
          "active": true,
          "order": 7
        },
        {
          "rank": 8,
          "coverUrl": "/top-ten/politics-with-genz/8.jpg",
          "videoUrl": "https://youtu.be/ASmo2D42ERo?si=BVkbDkLQ1l16oDz8",
          "active": true,
          "order": 8
        },
        {
          "rank": 9,
          "coverUrl": "/top-ten/politics-with-genz/9.jpg",
          "videoUrl": "https://youtu.be/5ODbyKU2rLU?si=F_vJjXB3BkLSufWn",
          "active": true,
          "order": 9
        },
        {
          "rank": 10,
          "coverUrl": "/top-ten/politics-with-genz/10.jpg",
          "videoUrl": "https://youtu.be/MjcjuosXF9M?si=_yKIFfFiSG9BbXBX",
          "active": true,
          "order": 10
        }
      ]
    },
    {
      "id": "curious-nikhil-prudvi-show",
      "name": "Curious Nikhil and Prudvi Show",
      "slug": "curious-nikhil-prudvi-show",
      "active": true,
      "order": 4,
      "videos": [
        {
          "rank": 1,
          "coverUrl": "/top-ten/curious-nikhil-prudvi-show/1.jpg",
          "videoUrl": "https://youtu.be/hs_rxxrnEe4?si=4HnNqHBM5t7EsWdh",
          "active": true,
          "order": 1
        },
        {
          "rank": 2,
          "coverUrl": "/top-ten/curious-nikhil-prudvi-show/2.jpg",
          "videoUrl": "https://youtu.be/Kj4hxUJrE9o?si=Av39dxhWAKgHjErO",
          "active": true,
          "order": 2
        },
        {
          "rank": 3,
          "coverUrl": "/top-ten/curious-nikhil-prudvi-show/3.jpg",
          "videoUrl": "https://youtu.be/qu6SVVmLhYs?si=tdIORMlMGB4shdE3",
          "active": true,
          "order": 3
        },
        {
          "rank": 4,
          "coverUrl": "/top-ten/curious-nikhil-prudvi-show/4.jpg",
          "videoUrl": "https://youtu.be/m4Igp2SIK3E?si=lQBJ64uSCPUoYvjS",
          "active": true,
          "order": 4
        },
        {
          "rank": 5,
          "coverUrl": "/top-ten/curious-nikhil-prudvi-show/5.jpg",
          "videoUrl": "https://youtu.be/luC1_Lt7p78?si=qBQnka6yvCn-xRFi",
          "active": true,
          "order": 5
        },
        {
          "rank": 6,
          "coverUrl": "/top-ten/curious-nikhil-prudvi-show/6.jpg",
          "videoUrl": "https://youtu.be/ptzfYmFVExA?si=iOobz8ewxKMPYo51",
          "active": true,
          "order": 6
        },
        {
          "rank": 7,
          "coverUrl": "/top-ten/curious-nikhil-prudvi-show/7.jpg",
          "videoUrl": "https://youtu.be/D4vbJ84z6hA?si=_3YAMkglSbGqLXn3",
          "active": true,
          "order": 7
        },
        {
          "rank": 8,
          "coverUrl": "/top-ten/curious-nikhil-prudvi-show/8.jpg",
          "videoUrl": "https://youtu.be/irqORsJ_55Y?si=jPU1PyJCiJr-1RCO",
          "active": true,
          "order": 8
        },
        {
          "rank": 9,
          "coverUrl": "/top-ten/curious-nikhil-prudvi-show/9.jpg",
          "videoUrl": "https://youtu.be/5SbMw1EhfkI?si=pzzmu-WVRKeXnCf5",
          "active": true,
          "order": 9
        },
        {
          "rank": 10,
          "coverUrl": "/top-ten/curious-nikhil-prudvi-show/10.jpg",
          "videoUrl": "https://youtu.be/OYbkMxfMwNw?si=xFty_CIWMbIQaEHn",
          "active": true,
          "order": 10
        }
      ]
    },
    {
      "id": "dad-sense",
      "name": "Dad Sense",
      "slug": "dad-sense",
      "active": true,
      "order": 5,
      "videos": [
        {
          "rank": 1,
          "coverUrl": "/top-ten/dad-sense/1.jpg",
          "videoUrl": "https://youtu.be/-oRHTIiuSeY?si=8AU54XG0529PylBS",
          "active": true,
          "order": 1
        },
        {
          "rank": 2,
          "coverUrl": "/top-ten/dad-sense/2.jpg",
          "videoUrl": "https://youtu.be/FdaOO24aTH8?si=SaxzXeYm08vgpGYf",
          "active": true,
          "order": 2
        },
        {
          "rank": 3,
          "coverUrl": "/top-ten/dad-sense/3.jpg",
          "videoUrl": "https://youtu.be/ftnnsdr2s2o?si=lp8WrON5lHcmx2Iy",
          "active": true,
          "order": 3
        },
        {
          "rank": 4,
          "coverUrl": "/top-ten/dad-sense/4.jpg",
          "videoUrl": "https://youtu.be/Gsg214OxTHM?si=IOlXgaIwv2JtKFnZ",
          "active": true,
          "order": 4
        },
        {
          "rank": 5,
          "coverUrl": "/top-ten/dad-sense/5.jpg",
          "videoUrl": "https://youtu.be/I3ZfoCVzHN4?si=wcE6GqrZ-tj11gxl",
          "active": true,
          "order": 5
        },
        {
          "rank": 6,
          "coverUrl": "/top-ten/dad-sense/6.jpg",
          "videoUrl": "https://youtu.be/mZUZoiuk1Hc?si=msxVEdXJm8moWxPm",
          "active": true,
          "order": 6
        },
        {
          "rank": 7,
          "coverUrl": "/top-ten/dad-sense/7.jpg",
          "videoUrl": "https://youtu.be/oce168Q9PUY?si=cYe_DlNanehJHQqN",
          "active": true,
          "order": 7
        },
        {
          "rank": 8,
          "coverUrl": "/top-ten/dad-sense/8.jpg",
          "videoUrl": "https://youtu.be/W1ErSu0bIOY?si=q4aFPWj4c9kbRh14",
          "active": true,
          "order": 8
        },
        {
          "rank": 9,
          "coverUrl": "/top-ten/dad-sense/9.jpg",
          "videoUrl": "https://youtu.be/X6U_SCtvmYs?si=nuyUYAlCmLLWg0mB",
          "active": true,
          "order": 9
        },
        {
          "rank": 10,
          "coverUrl": "/top-ten/dad-sense/10.jpg",
          "videoUrl": "https://youtu.be/zpt_YTFL_-k?si=56p9A5U7XdqiI2_7",
          "active": true,
          "order": 10
        }
      ]
    },
    {
      "id": "decoding-democracy-dr-jp",
      "name": "Decoding Democracy with Dr. JP",
      "slug": "decoding-democracy-dr-jp",
      "active": true,
      "order": 6,
      "videos": [
        {
          "rank": 1,
          "coverUrl": "/top-ten/decoding-democracy-dr-jp/1.jpg",
          "videoUrl": "https://youtu.be/DmWl5ysDJVA?si=Ykyx-4G4-_ya7I-O",
          "active": true,
          "order": 1
        },
        {
          "rank": 2,
          "coverUrl": "/top-ten/decoding-democracy-dr-jp/2.jpg",
          "videoUrl": "https://youtu.be/1msnkYty1tw?si=h4KNIPGPg5bw2aha",
          "active": true,
          "order": 2
        },
        {
          "rank": 3,
          "coverUrl": "/top-ten/decoding-democracy-dr-jp/3.jpg",
          "videoUrl": "https://youtu.be/nqr1o-_LkFc?si=lhguOGMTCe7UsAjh",
          "active": true,
          "order": 3
        },
        {
          "rank": 4,
          "coverUrl": "/top-ten/decoding-democracy-dr-jp/4.jpg",
          "videoUrl": "https://youtu.be/9v3AelovWo8?si=a41GV_dEINhQjUgP",
          "active": true,
          "order": 4
        },
        {
          "rank": 5,
          "coverUrl": "/top-ten/decoding-democracy-dr-jp/5.jpg",
          "videoUrl": "https://youtu.be/yvQQ5vWQq48?si=cCKF0B0n6vA-CmYf",
          "active": true,
          "order": 5
        },
        {
          "rank": 6,
          "coverUrl": "/top-ten/decoding-democracy-dr-jp/6.jpg",
          "videoUrl": "https://youtu.be/l3DoAv79eMU?si=Pvypvzhj2yZC7g1n",
          "active": true,
          "order": 6
        },
        {
          "rank": 7,
          "coverUrl": "/top-ten/decoding-democracy-dr-jp/7.jpg",
          "videoUrl": "https://youtu.be/fKf2MQQK6Z0?si=erAh2LwYtkne2KB_",
          "active": true,
          "order": 7
        },
        {
          "rank": 8,
          "coverUrl": "/top-ten/decoding-democracy-dr-jp/8.jpg",
          "videoUrl": "https://youtu.be/ik4gjGjG8cM?si=0_dJx4B6Aw5splLY",
          "active": true,
          "order": 8
        },
        {
          "rank": 9,
          "coverUrl": "/top-ten/decoding-democracy-dr-jp/9.jpg",
          "videoUrl": "https://youtu.be/RGckVufSA5g?si=2UDQP22qYzpOXC_E",
          "active": true,
          "order": 9
        },
        {
          "rank": 10,
          "coverUrl": "/top-ten/decoding-democracy-dr-jp/10.jpg",
          "videoUrl": "https://youtu.be/tmhsyooNdmQ?si=VjXx-BG6Ez8AyGiV",
          "active": true,
          "order": 10
        }
      ]
    },
    {
      "id": "great-indian-points-miles",
      "name": "The Great Indian Points and Miles",
      "slug": "great-indian-points-miles",
      "active": true,
      "order": 7,
      "videos": [
        {
          "rank": 1,
          "coverUrl": "/top-ten/great-indian-points-miles/1.jpg",
          "videoUrl": "https://youtu.be/cngYxp0fKj4?si=11T1eS1zkLRjWamQ",
          "active": true,
          "order": 1
        },
        {
          "rank": 2,
          "coverUrl": "/top-ten/great-indian-points-miles/2.jpg",
          "videoUrl": "https://youtu.be/EWVPB7feyMA?si=_nGPYEhIyLHeu7it",
          "active": true,
          "order": 2
        },
        {
          "rank": 3,
          "coverUrl": "/top-ten/great-indian-points-miles/3.jpg",
          "videoUrl": "https://youtu.be/g3-qRiH2NT8?si=1bXPD9z7j-w0pytN",
          "active": true,
          "order": 3
        },
        {
          "rank": 4,
          "coverUrl": "/top-ten/great-indian-points-miles/4.jpg",
          "videoUrl": "https://youtu.be/H7GLqtCuelk?si=bm-qQlnfIHqeCtkY",
          "active": true,
          "order": 4
        },
        {
          "rank": 5,
          "coverUrl": "/top-ten/great-indian-points-miles/5.jpg",
          "videoUrl": "https://youtu.be/oJCJ0SpYC0w?si=KlG-LLE8890BMalk",
          "active": true,
          "order": 5
        },
        {
          "rank": 6,
          "coverUrl": "/top-ten/great-indian-points-miles/6.jpg",
          "videoUrl": "https://youtu.be/P0y-WBbwlTs?si=wjH0Io025Vkk9qOr",
          "active": true,
          "order": 6
        },
        {
          "rank": 7,
          "coverUrl": "/top-ten/great-indian-points-miles/7.jpg",
          "videoUrl": "https://youtu.be/PYf-dyR5QzM?si=eelhPeTDVL5PL5Te",
          "active": true,
          "order": 7
        },
        {
          "rank": 8,
          "coverUrl": "/top-ten/great-indian-points-miles/8.jpg",
          "videoUrl": "https://youtu.be/Tuija1K1190?si=F5tLoY162ii4Fs6z",
          "active": true,
          "order": 8
        },
        {
          "rank": 9,
          "coverUrl": "/top-ten/great-indian-points-miles/9.jpg",
          "videoUrl": "https://youtu.be/vbJmJ_xbEos?si=zBY-kb75aER5Zyyy",
          "active": true,
          "order": 9
        },
        {
          "rank": 10,
          "coverUrl": "/top-ten/great-indian-points-miles/10.jpg",
          "videoUrl": "https://youtu.be/XIXHyGSBj3Q?si=a6PmJaE-wr3nAQYc",
          "active": true,
          "order": 10
        }
      ]
    },
    {
      "id": "nikhil-gunda-show",
      "name": "The Nikhil Gunda Show",
      "slug": "nikhil-gunda-show",
      "active": true,
      "order": 8,
      "videos": [
        {
          "rank": 1,
          "coverUrl": "/top-ten/nikhil-gunda-show/1.jpg",
          "videoUrl": "https://youtu.be/uP7rSVKH6o8?si=u6FvOjTIQh-qZ0iE",
          "active": true,
          "order": 1
        },
        {
          "rank": 2,
          "coverUrl": "/top-ten/nikhil-gunda-show/2.jpg",
          "videoUrl": "https://youtu.be/mRDmTw-k-sQ?si=OMI2tZtJQICVYfOz",
          "active": true,
          "order": 2
        },
        {
          "rank": 3,
          "coverUrl": "/top-ten/nikhil-gunda-show/3.jpg",
          "videoUrl": "https://youtu.be/7PFTRbFDa3Q?si=S6stdDzv3ceQ1QhI",
          "active": true,
          "order": 3
        },
        {
          "rank": 4,
          "coverUrl": "/top-ten/nikhil-gunda-show/4.jpg",
          "videoUrl": "https://youtu.be/ZnBgOTxXwGw?si=l1nLGt5dJwnkOIjr",
          "active": true,
          "order": 4
        },
        {
          "rank": 5,
          "coverUrl": "/top-ten/nikhil-gunda-show/5.jpg",
          "videoUrl": "https://youtu.be/aFnGhCfXsUE?si=pRMrG-cF0_73JcAA",
          "active": true,
          "order": 5
        },
        {
          "rank": 6,
          "coverUrl": "/top-ten/nikhil-gunda-show/6.jpg",
          "videoUrl": "https://youtu.be/506sYh8Pw_4?si=2-f2KKweXVrHYXZN",
          "active": true,
          "order": 6
        },
        {
          "rank": 7,
          "coverUrl": "/top-ten/nikhil-gunda-show/7.jpg",
          "videoUrl": "https://youtu.be/j9BPI72RdiE?si=ib4SkuvPnorNnFwZ",
          "active": true,
          "order": 7
        },
        {
          "rank": 8,
          "coverUrl": "/top-ten/nikhil-gunda-show/8.jpg",
          "videoUrl": "https://youtu.be/v3MruuAgBio?si=y8u_ze0BTZOMzY3H",
          "active": true,
          "order": 8
        },
        {
          "rank": 9,
          "coverUrl": "/top-ten/nikhil-gunda-show/9.jpg",
          "videoUrl": "https://youtu.be/wVpsGF39Z18?si=jwVPjQcwllJmC9HE",
          "active": true,
          "order": 9
        },
        {
          "rank": 10,
          "coverUrl": "/top-ten/nikhil-gunda-show/10.jpg",
          "videoUrl": "https://youtu.be/5KUZk_bxp6M?si=DuEoilkfLX407e6p",
          "active": true,
          "order": 10
        }
      ]
    },
    {
      "id": "upsc-radio",
      "name": "UPSC Radio",
      "slug": "upsc-radio",
      "active": true,
      "order": 9,
      "videos": [
        {
          "rank": 1,
          "coverUrl": "/top-ten/upsc-radio/1.jpg",
          "videoUrl": "https://youtu.be/9qE2acfE5IM?si=QlUjSsmi9iTH9HbY",
          "active": true,
          "order": 1
        },
        {
          "rank": 2,
          "coverUrl": "/top-ten/upsc-radio/2.jpg",
          "videoUrl": "https://youtu.be/60-keqf966k?si=DvlNT4PKodoIDYUv",
          "active": true,
          "order": 2
        },
        {
          "rank": 3,
          "coverUrl": "/top-ten/upsc-radio/3.jpg",
          "videoUrl": "https://youtu.be/hp_nY7aQuHA?si=p9_YpgMOV9wYuUYa",
          "active": true,
          "order": 3
        },
        {
          "rank": 4,
          "coverUrl": "/top-ten/upsc-radio/4.jpg",
          "videoUrl": "https://youtu.be/J5bbGTaxC_M?si=WYJLGq-niKnc6gTu",
          "active": true,
          "order": 4
        },
        {
          "rank": 5,
          "coverUrl": "/top-ten/upsc-radio/5.jpg",
          "videoUrl": "https://youtu.be/K5NhSTRqHC0?si=btwLoFMQYn_yoP25",
          "active": true,
          "order": 5
        },
        {
          "rank": 6,
          "coverUrl": "/top-ten/upsc-radio/6.jpg",
          "videoUrl": "https://youtu.be/LygjLtZgPds?si=ZqEL0kkugf05Ck4L",
          "active": true,
          "order": 6
        },
        {
          "rank": 7,
          "coverUrl": "/top-ten/upsc-radio/7.jpg",
          "videoUrl": "https://youtu.be/OooO_GU_qrM?si=w_3EMjW9jd4RdfKy",
          "active": true,
          "order": 7
        },
        {
          "rank": 8,
          "coverUrl": "/top-ten/upsc-radio/8.jpg",
          "videoUrl": "https://youtu.be/QGxYS5MfJTE?si=WTcXSyKGn9d8wIaw",
          "active": true,
          "order": 8
        },
        {
          "rank": 9,
          "coverUrl": "/top-ten/upsc-radio/9.jpg",
          "videoUrl": "https://youtu.be/TrOyf64WbMY?si=GJGbier4YAe6h2lZ",
          "active": true,
          "order": 9
        },
        {
          "rank": 10,
          "coverUrl": "/top-ten/upsc-radio/10.jpg",
          "videoUrl": "https://youtu.be/Z1V0aLh3FMw?si=VPf6zo8mTDlfyxZT",
          "active": true,
          "order": 10
        }
      ]
    }
  ]
});

// ===== Utils.gs =====
function jsonOutput_(payload) {
  return ContentService.createTextOutput(JSON.stringify(payload))
    .setMimeType(ContentService.MimeType.JSON);
}

function parseJsonBody_(e) {
  if (!e || !e.postData || !e.postData.contents) throw new Error('Request body is required.');
  if (Number(e.postData.length || e.contentLength || 0) > 20000) throw new Error('Request is too large.');
  try {
    return JSON.parse(e.postData.contents);
  } catch (error) {
    throw new Error('Invalid JSON request.');
  }
}

function newRequestId_(prefix) {
  return String(prefix || 'REQ') + '-' + Utilities.getUuid();
}

function normalizeText_(value, maxLength) {
  const normalized = String(value == null ? '' : value)
    .replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F]/g, '')
    .trim();
  return normalized.slice(0, maxLength || 1000);
}

function normalizeEmail_(value) {
  return normalizeText_(value, 180).toLowerCase();
}

function isEmail_(value) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(value);
}

function isPhone_(value) {
  if (!value) return true;
  const digits = String(value).replace(/\D/g, '');
  return digits.length >= 7 && digits.length <= 15;
}

function isHttpUrl_(value) {
  return /^https?:\/\//i.test(value || '');
}

function bool_(value) {
  if (typeof value === 'boolean') return value;
  return ['true', '1', 'yes', 'y'].indexOf(String(value).toLowerCase()) >= 0;
}

function number_(value, fallback) {
  const parsed = Number(value);
  return isFinite(parsed) ? parsed : fallback;
}

function hash_(value) {
  const bytes = Utilities.computeDigest(Utilities.DigestAlgorithm.SHA_256, value, Utilities.Charset.UTF_8);
  return bytes.map(function(byte) {
    const v = (byte < 0 ? byte + 256 : byte).toString(16);
    return v.length === 1 ? '0' + v : v;
  }).join('');
}

function publicError_(error) {
  const message = error && error.message ? String(error.message) : 'Unexpected server error.';
  if (/required|valid|duplicate|busy|configured|missing/i.test(message)) return message;
  return 'We could not process the request. Please try again.';
}

function safeCell_(value) {
  if (typeof value !== 'string') return value;
  return /^[=+\-@]/.test(value) ? "'" + value : value;
}

function enforceRateLimit_(identity, scope) {
  const key = 'rate:' + String(scope || 'generic') + ':' + hash_(String(identity || '').toLowerCase());
  const cache = CacheService.getScriptCache();
  const current = Number(cache.get(key) || '0');
  if (current >= 5) throw new Error('Too many submissions. Please try again later.');
  cache.put(key, String(current + 1), 3600);
}

// ===== Database.gs =====
const SHEET_HEADERS = Object.freeze({
  Business_Inquiries: [
    'Inquiry_ID', 'Created_At', 'Name', 'Work_Email', 'Phone', 'Company', 'Designation',
    'City', 'Service', 'Message', 'Source_Page', 'Status', 'Request_Hash'
  ],
  Career_Inquiries: [
    'Application_ID', 'Created_At', 'Creator_Name', 'Email', 'Phone', 'City', 'Creator_Category',
    'Primary_Platform', 'Profile_URL', 'Audience_Stage', 'Message', 'Source_Page', 'Status', 'Request_Hash'
  ],
  Channels: ['Channel_ID', 'Channel_Name', 'Slug', 'Active', 'Display_Order', 'Updated_At'],
  Video_Content: ['Video_ID', 'Channel_ID', 'Rank', 'Cover_URL', 'Video_URL', 'Active', 'Display_Order', 'Updated_At'],
  Site_Settings: ['Key', 'Value', 'Value_Type', 'Active', 'Updated_At'],
  Services: ['Service_ID', 'Active', 'Display_Order', 'Title', 'Description', 'Updated_At'],
  Admin_Log: ['Timestamp', 'Action', 'Entity', 'Entity_ID', 'Details'],
  Error_Log: ['Timestamp', 'Request_ID', 'Action', 'Error', 'Stack'],
});

/**
 * ONE-TIME PRODUCTION SETUP
 *
 * Run this function manually from a new standalone Apps Script project.
 * It creates the Google Sheets database automatically, stores its ID in
 * Script Properties, creates all tables, applies formatting/validation,
 * and seeds Kathanika's production content.
 *
 * Safe to run again: it reuses the configured database and does not
 * duplicate seed rows when tables already contain data.
 */
function setupDatabase() {
  const lock = LockService.getScriptLock();
  if (!lock.tryLock(30000)) throw new Error('Database setup is already running. Please try again shortly.');

  try {
    const props = PropertiesService.getScriptProperties();
    let spreadsheet = null;
    let created = false;
    const existingId = props.getProperty('SPREADSHEET_ID') || '';

    if (existingId) {
      try {
        spreadsheet = SpreadsheetApp.openById(existingId);
      } catch (error) {
        // The stored file may have been deleted or access may have changed.
        props.deleteProperty('SPREADSHEET_ID');
      }
    }

    if (!spreadsheet) {
      spreadsheet = SpreadsheetApp.create(KATHANIKA.DATABASE_NAME);
      created = true;
      props.setProperty('SPREADSHEET_ID', spreadsheet.getId());
    }

    if (!props.getProperty('NOTIFICATION_EMAIL')) {
      props.setProperty('NOTIFICATION_EMAIL', KATHANIKA.DEFAULT_NOTIFICATION_EMAIL);
    }

    // Production-friendly spreadsheet defaults.
    try { spreadsheet.setSpreadsheetTimeZone('Asia/Kolkata'); } catch (error) { /* optional */ }
    try { spreadsheet.setSpreadsheetLocale('en_IN'); } catch (error) { /* optional */ }

    Object.keys(SHEET_HEADERS).forEach(function(name) {
      ensureSheet_(name);
    });

    removeDefaultBlankSheet_(spreadsheet);
    seedDatabase_();
    autoSizeDatabase_(spreadsheet);
    invalidatePublicContentCache();

    // setupDatabase already owns the script lock, so write this setup audit row directly.
    getSheet_(KATHANIKA.SHEETS.ADMIN_LOG).appendRow([
      new Date(),
      created ? 'DATABASE_CREATED' : 'DATABASE_VERIFIED',
      'Database',
      spreadsheet.getId(),
      created
        ? 'Database created, schema configured and seed data installed.'
        : 'Existing database verified; missing schema elements repaired and empty seed tables populated.'
    ]);

    const result = {
      ok: true,
      created: created,
      databaseName: spreadsheet.getName(),
      spreadsheetId: spreadsheet.getId(),
      spreadsheetUrl: spreadsheet.getUrl(),
      notificationEmail: props.getProperty('NOTIFICATION_EMAIL') || '',
      sheets: Object.keys(SHEET_HEADERS),
      message: created
        ? 'Kathanika production database created successfully.'
        : 'Kathanika production database is already configured and has been verified.',
    };

    console.log(JSON.stringify(result, null, 2));
    return result;
  } finally {
    lock.releaseLock();
  }
}

/**
 * Optional status helper. Run any time to see which database the API uses.
 */
function getDatabaseStatus() {
  const props = PropertiesService.getScriptProperties();
  const id = props.getProperty('SPREADSHEET_ID') || '';
  if (!id) {
    return { ok: false, configured: false, message: 'Run setupDatabase() first.' };
  }

  try {
    const ss = SpreadsheetApp.openById(id);
    return {
      ok: true,
      configured: true,
      spreadsheetId: ss.getId(),
      spreadsheetUrl: ss.getUrl(),
      databaseName: ss.getName(),
      sheets: ss.getSheets().map(function(sheet) { return sheet.getName(); }),
    };
  } catch (error) {
    return {
      ok: false,
      configured: false,
      spreadsheetId: id,
      message: 'The stored database could not be opened. Run setupDatabase() to repair the configuration.',
    };
  }
}


/**
 * PRODUCTION VERIFICATION
 *
 * Run after setupDatabase() and after any major content/schema maintenance.
 * This performs read-only checks and returns a concise production status.
 */
function verifyProductionSetup() {
  const status = getDatabaseStatus();
  if (!status.ok || !status.configured) return status;

  const issues = [];
  const ss = SpreadsheetApp.openById(status.spreadsheetId);

  Object.keys(SHEET_HEADERS).forEach(function(name) {
    const sheet = ss.getSheetByName(name);
    if (!sheet) {
      issues.push('Missing sheet: ' + name);
      return;
    }

    const expected = SHEET_HEADERS[name];
    const actual = sheet.getRange(1, 1, 1, expected.length).getDisplayValues()[0];
    expected.forEach(function(header, index) {
      if (actual[index] !== header) {
        issues.push('Header mismatch in ' + name + ' column ' + (index + 1) + ': expected ' + header);
      }
    });
  });

  if (issues.length === 0) {
    const channels = readObjects_(KATHANIKA.SHEETS.CHANNELS).filter(function(row) { return bool_(row.Active); });
    const videos = readObjects_(KATHANIKA.SHEETS.VIDEOS).filter(function(row) { return bool_(row.Active); });
    const services = readObjects_(KATHANIKA.SHEETS.SERVICES).filter(function(row) { return bool_(row.Active); });
    const settings = readObjects_(KATHANIKA.SHEETS.SETTINGS).filter(function(row) { return bool_(row.Active); });

    if (channels.length !== 9) issues.push('Expected 9 active channels; found ' + channels.length + '.');
    if (videos.length !== 90) issues.push('Expected 90 active videos; found ' + videos.length + '.');
    if (services.length !== 10) issues.push('Expected 10 active services; found ' + services.length + '.');
    if (settings.length < 8) issues.push('Expected production site settings; found only ' + settings.length + ' active rows.');

    const videoKeys = {};
    videos.forEach(function(video) {
      const channelId = String(video.Channel_ID || '');
      const rank = number_(video.Rank, 0);
      const key = channelId + ':' + rank;
      if (!channelId) issues.push('Video row missing Channel_ID.');
      if (rank < 1 || rank > 10) issues.push('Invalid video rank for ' + String(video.Video_ID || key) + '.');
      if (videoKeys[key]) issues.push('Duplicate channel/rank: ' + key + '.');
      videoKeys[key] = true;
      if (!isHttpUrl_(String(video.Video_URL || ''))) issues.push('Invalid Video_URL for ' + String(video.Video_ID || key) + '.');
      if (!String(video.Cover_URL || '').trim()) issues.push('Missing Cover_URL for ' + String(video.Video_ID || key) + '.');
    });

    channels.forEach(function(channel) {
      const channelId = String(channel.Channel_ID || '');
      for (let rank = 1; rank <= 10; rank += 1) {
        if (!videoKeys[channelId + ':' + rank]) issues.push('Missing rank ' + rank + ' for channel ' + channelId + '.');
      }
    });
  }

  const result = {
    ok: issues.length === 0,
    configured: true,
    apiVersion: KATHANIKA.API_VERSION,
    spreadsheetId: status.spreadsheetId,
    spreadsheetUrl: status.spreadsheetUrl,
    databaseName: status.databaseName,
    issues: issues,
    message: issues.length === 0
      ? 'Kathanika V30 database verification passed.'
      : 'Kathanika V30 database verification found ' + issues.length + ' issue(s).',
  };

  console.log(JSON.stringify(result, null, 2));
  return result;
}

function getSpreadsheet_() {
  const config = getScriptConfig_();
  if (!config.spreadsheetId) {
    throw new Error('Database is not configured. Run setupDatabase() once from the Apps Script editor.');
  }

  try {
    return SpreadsheetApp.openById(config.spreadsheetId);
  } catch (error) {
    throw new Error('Configured database is unavailable. Run setupDatabase() to repair the setup.');
  }
}

function getSheet_(name) {
  const ss = getSpreadsheet_();
  const sheet = ss.getSheetByName(name);
  if (!sheet) throw new Error('Missing database sheet: ' + name);
  return sheet;
}

function ensureSheet_(name) {
  const ss = getSpreadsheet_();
  let sheet = ss.getSheetByName(name);
  if (!sheet) sheet = ss.insertSheet(name);
  const headers = SHEET_HEADERS[name];
  if (!headers) throw new Error('No schema registered for ' + name);

  if (sheet.getLastRow() === 0) {
    sheet.getRange(1, 1, 1, headers.length).setValues([headers]);
  } else {
    const existing = sheet.getRange(1, 1, 1, headers.length).getDisplayValues()[0];
    headers.forEach(function(header, index) {
      if (existing[index] !== header) sheet.getRange(1, index + 1).setValue(header);
    });
  }

  sheet.setFrozenRows(1);
  sheet.getRange(1, 1, 1, headers.length)
    .setFontWeight('bold')
    .setBackground('#412D15')
    .setFontColor('#E1DCC9');
  applySheetUx_(sheet, name);
  return sheet;
}

function applySheetUx_(sheet, name) {
  if (name === KATHANIKA.SHEETS.BUSINESS) {
    const rule = SpreadsheetApp.newDataValidation().requireValueInList(['New','Contacted','Follow-up','Qualified','Closed','Archived'], true).setAllowInvalid(false).build();
    sheet.getRange('L2:L1000').setDataValidation(rule);
  } else if (name === KATHANIKA.SHEETS.CAREER) {
    const rule = SpreadsheetApp.newDataValidation().requireValueInList(['New','Contacted','Follow-up','Qualified','Closed','Archived'], true).setAllowInvalid(false).build();
    sheet.getRange('M2:M1000').setDataValidation(rule);
  } else if (name === KATHANIKA.SHEETS.CHANNELS) {
    const checkbox = SpreadsheetApp.newDataValidation().requireCheckbox().build();
    sheet.getRange('D2:D500').setDataValidation(checkbox);
  } else if (name === KATHANIKA.SHEETS.VIDEOS) {
    const checkbox = SpreadsheetApp.newDataValidation().requireCheckbox().build();
    sheet.getRange('F2:F2000').setDataValidation(checkbox);
  } else if (name === KATHANIKA.SHEETS.SETTINGS) {
    const checkbox = SpreadsheetApp.newDataValidation().requireCheckbox().build();
    sheet.getRange('D2:D500').setDataValidation(checkbox);
  } else if (name === KATHANIKA.SHEETS.SERVICES) {
    const checkbox = SpreadsheetApp.newDataValidation().requireCheckbox().build();
    sheet.getRange('B2:B500').setDataValidation(checkbox);
  }
}

function removeDefaultBlankSheet_(ss) {
  const candidateNames = ['Sheet1', 'Sheet 1'];
  candidateNames.forEach(function(name) {
    const sheet = ss.getSheetByName(name);
    if (!sheet || ss.getSheets().length <= 1) return;
    if (sheet.getLastRow() <= 1 && sheet.getLastColumn() <= 1 && String(sheet.getRange('A1').getDisplayValue() || '').trim() === '') {
      ss.deleteSheet(sheet);
    }
  });
}

function autoSizeDatabase_(ss) {
  Object.keys(SHEET_HEADERS).forEach(function(name) {
    const sheet = ss.getSheetByName(name);
    if (!sheet) return;
    const columnCount = SHEET_HEADERS[name].length;
    try { sheet.autoResizeColumns(1, columnCount); } catch (error) { /* cosmetic only */ }
    // Keep long-content columns usable instead of excessively wide.
    if (name === KATHANIKA.SHEETS.BUSINESS) {
      sheet.setColumnWidth(10, 360);
    } else if (name === KATHANIKA.SHEETS.CAREER) {
      sheet.setColumnWidth(11, 360);
    } else if (name === KATHANIKA.SHEETS.VIDEOS) {
      sheet.setColumnWidth(4, 320);
      sheet.setColumnWidth(5, 320);
    } else if (name === KATHANIKA.SHEETS.SETTINGS) {
      sheet.setColumnWidth(2, 420);
    } else if (name === KATHANIKA.SHEETS.SERVICES) {
      sheet.setColumnWidth(5, 420);
    }
  });
}

function bootstrapProduction(notificationEmail) {
  const result = setupDatabase();
  if (notificationEmail) {
    PropertiesService.getScriptProperties().setProperty('NOTIFICATION_EMAIL', String(notificationEmail).trim());
    result.notificationEmail = String(notificationEmail).trim();
  }
  return result;
}

function appendRowLocked_(sheetName, row) {
  const lock = LockService.getScriptLock();
  if (!lock.tryLock(7000)) throw new Error('The system is busy. Please try again.');
  try {
    const sheet = getSheet_(sheetName);
    sheet.appendRow(row);
  } finally {
    lock.releaseLock();
  }
}

/**
 * Serializes the duplicate check and append into one critical section.
 * This closes the race where two identical submissions arrive together.
 */
function appendInquiryLocked_(sheetName, hashColumn, hash, row) {
  const lock = LockService.getScriptLock();
  if (!lock.tryLock(7000)) throw new Error('The system is busy. Please try again.');
  try {
    rejectDuplicate_(sheetName, hashColumn, hash);
    getSheet_(sheetName).appendRow(row);
    markDuplicate_(hash);
  } finally {
    lock.releaseLock();
  }
}

function readObjects_(sheetName) {
  const sheet = getSheet_(sheetName);
  const values = sheet.getDataRange().getValues();
  if (values.length < 2) return [];
  const headers = values[0].map(String);
  return values.slice(1).filter(function(row) {
    return row.some(function(value) { return value !== '' && value !== null; });
  }).map(function(row) {
    const object = {};
    headers.forEach(function(header, index) { object[header] = row[index]; });
    return object;
  });
}

function isSheetEmpty_(name) {
  const sheet = getSheet_(name);
  const lastRow = sheet.getLastRow();
  if (lastRow <= 1) return true;
  const keys = sheet.getRange(2, 1, lastRow - 1, 1).getDisplayValues();
  return !keys.some(function(row) { return String(row[0] || '').trim() !== ''; });
}

function logAdmin_(action, entity, entityId, details) {
  try {
    appendRowLocked_(KATHANIKA.SHEETS.ADMIN_LOG, [new Date(), action, entity, entityId, details]);
  } catch (error) {
    console.error('Admin log failed', error);
  }
}

function logError_(requestId, action, error) {
  console.error(requestId, action, error);
  try {
    const sheet = getSheet_(KATHANIKA.SHEETS.ERROR_LOG);
    sheet.appendRow([
      new Date(), requestId, action,
      error && error.message ? error.message : String(error),
      error && error.stack ? String(error.stack).slice(0, 5000) : '',
    ]);
  } catch (loggingError) {
    console.error('Error log failed', loggingError);
  }
}

// ===== Seed.gs =====
function seedDatabase_() {
  seedSettings_();
  seedServices_();
  seedChannelsAndVideos_();
}

function seedSettings_() {
  if (!isSheetEmpty_(KATHANIKA.SHEETS.SETTINGS)) return;
  const now = new Date();
  const rows = KATHANIKA_SEED.settings.map(function(item) {
    return [item.key, item.value, item.type, true, now];
  });
  getSheet_(KATHANIKA.SHEETS.SETTINGS).getRange(2, 1, rows.length, 5).setValues(rows);
}

function seedServices_() {
  if (!isSheetEmpty_(KATHANIKA.SHEETS.SERVICES)) return;
  const now = new Date();
  const rows = KATHANIKA_SEED.services.map(function(item) {
    return [item.id, true, item.order, item.title, item.description, now];
  });
  getSheet_(KATHANIKA.SHEETS.SERVICES).getRange(2, 1, rows.length, 6).setValues(rows);
}

function seedChannelsAndVideos_() {
  const now = new Date();
  if (isSheetEmpty_(KATHANIKA.SHEETS.CHANNELS)) {
    const channelRows = KATHANIKA_SEED.channels.map(function(channel) {
      return [channel.id, channel.name, channel.slug, true, channel.order, now];
    });
    getSheet_(KATHANIKA.SHEETS.CHANNELS).getRange(2, 1, channelRows.length, 6).setValues(channelRows);
  }

  if (isSheetEmpty_(KATHANIKA.SHEETS.VIDEOS)) {
    const rows = [];
    KATHANIKA_SEED.channels.forEach(function(channel) {
      channel.videos.forEach(function(video) {
        rows.push([
          channel.id + '-' + video.rank,
          channel.id,
          video.rank,
          video.coverUrl,
          video.videoUrl,
          true,
          video.order,
          now,
        ]);
      });
    });
    getSheet_(KATHANIKA.SHEETS.VIDEOS).getRange(2, 1, rows.length, 8).setValues(rows);
  }
}

// ===== Content.gs =====
function getPublicContent_() {
  const cache = CacheService.getScriptCache();
  const cached = cache.get(KATHANIKA.CACHE_KEY);
  if (cached) {
    try { return JSON.parse(cached); } catch (error) { /* rebuild */ }
  }

  const settingsRows = readObjects_(KATHANIKA.SHEETS.SETTINGS).filter(function(row) { return bool_(row.Active); });
  const settingsMap = {};
  settingsRows.forEach(function(row) {
    const type = String(row.Value_Type || 'string').toLowerCase();
    let value = row.Value;
    if (type === 'json') {
      try { value = JSON.parse(String(row.Value || 'null')); } catch (error) { value = null; }
    } else if (type === 'number') {
      value = number_(row.Value, 0);
    } else if (type === 'boolean') {
      value = bool_(row.Value);
    } else {
      value = String(row.Value == null ? '' : row.Value);
    }
    settingsMap[String(row.Key)] = value;
  });

  const services = readObjects_(KATHANIKA.SHEETS.SERVICES)
    .filter(function(row) { return bool_(row.Active); })
    .map(function(row) {
      return {
        id: String(row.Service_ID),
        active: true,
        order: number_(row.Display_Order, 999),
        title: String(row.Title || ''),
        description: String(row.Description || ''),
      };
    })
    .sort(function(a, b) { return a.order - b.order; });

  const videoRows = readObjects_(KATHANIKA.SHEETS.VIDEOS).filter(function(row) { return bool_(row.Active); });
  const channels = readObjects_(KATHANIKA.SHEETS.CHANNELS)
    .filter(function(row) { return bool_(row.Active); })
    .map(function(row) {
      const channelId = String(row.Channel_ID);
      return {
        id: channelId,
        name: String(row.Channel_Name || ''),
        slug: String(row.Slug || ''),
        active: true,
        order: number_(row.Display_Order, 999),
        videos: videoRows
          .filter(function(video) { return String(video.Channel_ID) === channelId; })
          .map(function(video) {
            return {
              rank: number_(video.Rank, 999),
              coverUrl: String(video.Cover_URL || ''),
              videoUrl: String(video.Video_URL || ''),
              active: true,
              order: number_(video.Display_Order, number_(video.Rank, 999)),
            };
          })
          .sort(function(a, b) { return a.order - b.order; }),
      };
    })
    .sort(function(a, b) { return a.order - b.order; });

  const payload = {
    settings: {
      whatsappNumber: settingsMap.whatsappNumber || '',
      email: settingsMap.email || '',
      phone: settingsMap.phone || '',
      addressLine: settingsMap.addressLine || '',
      mapsUrl: settingsMap.mapsUrl || '',
      cities: settingsMap.cities || [],
      metrics: settingsMap.metrics || [],
    },
    social: {
      youtube: settingsMap.youtube || '',
      instagram: settingsMap.instagram || '',
      linkedin: settingsMap.linkedin || '',
    },
    services: services,
    topTenChannels: channels,
  };

  const serialized = JSON.stringify(payload);
  if (serialized.length < 95000) cache.put(KATHANIKA.CACHE_KEY, serialized, KATHANIKA.CACHE_SECONDS);
  return payload;
}

function invalidatePublicContentCache() {
  CacheService.getScriptCache().remove(KATHANIKA.CACHE_KEY);
  return { ok: true };
}

// ===== Inquiries.gs =====
function createBusinessInquiry_(raw, requestId) {
  if (normalizeText_(raw.website || '', 200)) return ignoredBotResponse_();

  const data = {
    name: normalizeText_(raw.name, 100),
    email: normalizeEmail_(raw.email),
    phone: normalizeText_(raw.phone, 40),
    company: normalizeText_(raw.company, 120),
    designation: normalizeText_(raw.designation, 100),
    city: normalizeText_(raw.city, 100),
    service: normalizeText_(raw.service, 160),
    message: normalizeText_(raw.message, 3000),
    sourcePage: normalizeText_(raw.sourcePage || '/contact', 120),
  };

  require_(data.name.length >= 2, 'Name is required.');
  require_(isEmail_(data.email), 'A valid email is required.');
  require_(isPhone_(data.phone), 'A valid phone number is required.');
  require_(data.company.length >= 2, 'Company / organisation is required.');
  require_(data.city.length >= 2, 'City is required.');
  require_(data.service.length >= 2, 'Service is required.');
  require_(data.message.length >= 10, 'Please add a little more detail about the inquiry.');

  enforceRateLimit_(data.email + '|' + data.phone, 'business');
  const hash = hash_(['business', data.email, data.phone, data.company, data.message].join('|').toLowerCase());
  const id = 'BI-' + Utilities.getUuid().split('-')[0].toUpperCase();
  const now = new Date();
  appendInquiryLocked_(KATHANIKA.SHEETS.BUSINESS, 13, hash, [
    id, now, safeCell_(data.name), safeCell_(data.email), safeCell_(data.phone), safeCell_(data.company), safeCell_(data.designation),
    safeCell_(data.city), safeCell_(data.service), safeCell_(data.message), safeCell_(data.sourcePage), KATHANIKA.DEFAULT_STATUS, hash,
  ]);
  notifyOwner_('New Kathanika Business Inquiry — ' + data.company,
    'Inquiry ID: ' + id + '\nName: ' + data.name + '\nEmail: ' + data.email + '\nPhone: ' + data.phone + '\nCompany: ' + data.company + '\nService: ' + data.service + '\n\n' + data.message);
  return { id: id, timestamp: now.toISOString() };
}

function createCareerInquiry_(raw, requestId) {
  if (normalizeText_(raw.website || '', 200)) return ignoredBotResponse_();

  const data = {
    name: normalizeText_(raw.name, 100),
    email: normalizeEmail_(raw.email),
    phone: normalizeText_(raw.phone, 40),
    city: normalizeText_(raw.city, 100),
    category: normalizeText_(raw.category || raw.designation, 120),
    platform: normalizeText_(raw.platform, 120),
    profileUrl: normalizeText_(raw.profileUrl || raw.company, 500),
    audienceStage: normalizeText_(raw.audienceStage, 160),
    message: normalizeText_(raw.message, 3000),
    sourcePage: normalizeText_(raw.sourcePage || '/creators', 120),
  };

  require_(data.name.length >= 2, 'Name is required.');
  require_(isEmail_(data.email), 'A valid email is required.');
  require_(isPhone_(data.phone), 'A valid phone number is required.');
  require_(data.city.length >= 2, 'City is required.');
  require_(data.category.length >= 2, 'Creator category is required.');
  require_(data.platform.length >= 2, 'Primary platform is required.');
  require_(isHttpUrl_(data.profileUrl), 'A valid channel / profile URL is required.');
  require_(data.audienceStage.length >= 2, 'Audience stage is required.');
  require_(data.message.length >= 10, 'Please add a little more detail about what you want to build.');

  enforceRateLimit_(data.email + '|' + data.phone, 'career');
  const hash = hash_(['career', data.email, data.phone, data.profileUrl, data.message].join('|').toLowerCase());
  const id = 'CI-' + Utilities.getUuid().split('-')[0].toUpperCase();
  const now = new Date();
  appendInquiryLocked_(KATHANIKA.SHEETS.CAREER, 14, hash, [
    id, now, safeCell_(data.name), safeCell_(data.email), safeCell_(data.phone), safeCell_(data.city), safeCell_(data.category), safeCell_(data.platform),
    safeCell_(data.profileUrl), safeCell_(data.audienceStage), safeCell_(data.message), safeCell_(data.sourcePage), KATHANIKA.DEFAULT_STATUS, hash,
  ]);
  notifyOwner_('New Kathanika Career Inquiry — ' + data.name,
    'Application ID: ' + id + '\nName: ' + data.name + '\nEmail: ' + data.email + '\nPhone: ' + data.phone + '\nCategory: ' + data.category + '\nPlatform: ' + data.platform + '\nProfile: ' + data.profileUrl + '\nAudience: ' + data.audienceStage + '\n\n' + data.message);
  return { id: id, timestamp: now.toISOString() };
}

function require_(condition, message) {
  if (!condition) throw new Error(message);
}

function ignoredBotResponse_() {
  return { id: 'ACCEPTED', timestamp: new Date().toISOString() };
}

function markDuplicate_(hash) {
  CacheService.getScriptCache().put('inquiry:' + hash, '1', 600);
}

function rejectDuplicate_(sheetName, hashColumn, hash) {
  if (CacheService.getScriptCache().get('inquiry:' + hash)) {
    throw new Error('This inquiry was already received recently.');
  }

  const sheet = getSheet_(sheetName);
  const lastRow = sheet.getLastRow();
  if (lastRow <= 1) return;
  const startRow = Math.max(2, lastRow - 99);
  const rowCount = lastRow - startRow + 1;
  const createdValues = sheet.getRange(startRow, 2, rowCount, 1).getValues();
  const hashValues = sheet.getRange(startRow, hashColumn, rowCount, 1).getDisplayValues();
  const cutoff = Date.now() - (10 * 60 * 1000);

  const duplicate = hashValues.some(function(row, index) {
    if (row[0] !== hash) return false;
    const created = createdValues[index][0];
    const timestamp = created instanceof Date ? created.getTime() : new Date(created).getTime();
    return isFinite(timestamp) && timestamp >= cutoff;
  });

  if (duplicate) throw new Error('This inquiry was already received recently.');
}

function notifyOwner_(subject, body) {
  const email = getScriptConfig_().notificationEmail;
  if (!email) return;
  try {
    MailApp.sendEmail({ to: email, subject: subject, body: body, name: 'Kathanika Website' });
  } catch (error) {
    console.warn('Notification email failed', error);
  }
}

// ===== Code.gs =====
function doGet(e) {
  const requestId = newRequestId_('GET');
  const action = normalizeText_((e && e.parameter && e.parameter.action) || 'health', 40).toLowerCase();
  try {
    if (action === 'health') {
      return jsonOutput_({
        ok: true,
        data: {
          service: 'Kathanika Media API',
          version: KATHANIKA.API_VERSION,
          timestamp: new Date().toISOString(),
        },
        requestId,
      });
    }

    if (action === 'content') {
      return jsonOutput_({ ok: true, data: getPublicContent_(), requestId });
    }

    return jsonOutput_({ ok: false, error: 'Unknown action.', requestId });
  } catch (error) {
    logError_(requestId, action, error);
    return jsonOutput_({ ok: false, error: publicError_(error), requestId });
  }
}

function doPost(e) {
  const requestId = newRequestId_('POST');
  let action = 'unknown';
  try {
    const body = parseJsonBody_(e);
    action = normalizeText_(body.action || '', 40);
    const payload = body.payload || {};

    if (action === 'businessInquiry') {
      return jsonOutput_({ ok: true, data: createBusinessInquiry_(payload, requestId), requestId });
    }

    if (action === 'careerInquiry') {
      return jsonOutput_({ ok: true, data: createCareerInquiry_(payload, requestId), requestId });
    }

    return jsonOutput_({ ok: false, error: 'Unknown action.', requestId });
  } catch (error) {
    logError_(requestId, action, error);
    return jsonOutput_({ ok: false, error: publicError_(error), requestId });
  }
}
