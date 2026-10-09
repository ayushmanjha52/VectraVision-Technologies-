// Every fact shown on the site lives here, so it can be checked and changed in one place.

export const company = {
  legalName: 'VectraVision Technologies Pvt Ltd',
  shortName: 'VectraVision',
  foundedISO: '2026-02',
  location: 'BIT Sindri, Dhanbad, Jharkhand, India',
  /** Full URL of the company LinkedIn page. Shown in the footer when set. */
  linkedin: null as string | null,
}

export const product = {
  name: 'Spandan',
  descriptor: 'A multistatic radar with micro-motion analysis',
  tagline: 'Radar that knows what it sees.',
}

export const founders = [
  {
    name: 'Ayushman Jha',
    slug: 'ayushman-jha',
    role: 'Co-founder and Systems Lead',
    email: 'ayushmanjha77@gmail.com',
    phone: '+91 62062 48741',
  },
  {
    name: 'Aastha Agarwal',
    slug: 'aastha-agarwal',
    role: 'Co-founder',
    email: 'aasthaagarwal128@gmail.com',
    phone: '+91 87897 77502',
  },
]

export const backing = {
  backedBy: [
    { name: 'TEXMiN', detail: 'IIT (ISM) Dhanbad', mark: 'TX' },
    { name: 'BIT Sindri', detail: 'Dhanbad, Jharkhand', mark: 'BIT' },
  ],
  recognisedBy: [
    { name: 'Startup India', detail: 'Recognised startup', mark: 'SI' },
    { name: 'Startup Jharkhand', detail: 'Recognised startup', mark: 'SJ' },
    { name: 'Udyam', detail: 'MSME registered', mark: 'MSME' },
  ],
}

// Targets in the live signature view. Real lab captures replace the simulation as the team imports them.
export const signatureTargets = [
  {
    id: 'person-walking',
    label: 'Person walking',
    color: '#F1ECE3',
    caption: "Swinging arms and legs wrap the body's trace in a steady rhythm.",
  },
  {
    id: 'person-crawling',
    label: 'Person crawling',
    color: '#FFB547',
    caption: 'Slow and low. The kind of movement that is easy to miss.',
  },
  {
    id: 'drone-no-payload',
    label: 'Drone',
    color: '#8FB3FF',
    caption: 'Spinning rotor blades flash right across the signature.',
  },
  {
    id: 'drone-payload',
    label: 'Drone with payload',
    color: '#FF5B22',
    caption: 'The rotors work harder and the load sways. Spandan spots the difference.',
  },
]
