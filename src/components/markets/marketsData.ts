export type Market = {
  country: string;
  region: string;
  coordinates: [number, number];
  description: string;
};

export const markets: Market[] = [
  // Latin America
  {
    country: 'Brazil',
    region: 'Latin America',
    coordinates: [-47.9292, -15.7801],
    description: 'Key partner for active pharmaceutical ingredients in agrochemicals and generics.',
  },
  {
    country: 'Mexico',
    region: 'Latin America',
    coordinates: [-102.5528, 23.6345],
    description: 'Major distribution hub for APIs across Central and North American markets.',
  },
  {
    country: 'Peru',
    region: 'Latin America',
    coordinates: [-75.0152, -9.19],
    description: 'Growing demand for high-purity intermediates and generic API supply.',
  },
  {
    country: 'Uruguay',
    region: 'Latin America',
    coordinates: [-55.7658, -32.5228],
    description: 'Strategic gateway for pharmaceutical exports in the Southern Cone region.',
  },
  {
    country: 'Chile',
    region: 'Latin America',
    coordinates: [-71.5430, -35.6751],
    description: 'Emerging market for regulated generics and specialty pharmaceutical ingredients.',
  },
  {
    country: 'Paraguay',
    region: 'Latin America',
    coordinates: [-58.4438, -23.4425],
    description: 'Developing market for cost-effective API supply chains in South America.',
  },
  {
    country: 'Guatemala',
    region: 'Latin America',
    coordinates: [-90.2308, 15.7835],
    description: 'Central American pharmaceutical growth market for essential APIs.',
  },
  {
    country: 'Argentina',
    region: 'Latin America',
    coordinates: [-63.6167, -38.4161],
    description: 'Established pharma market with strong demand for certified bulk APIs.',
  },

  // Africa
  {
    country: 'Kenya',
    region: 'Africa',
    coordinates: [37.9062, -0.0236],
    description: 'East African hub for essential medicines and generic API distribution.',
  },
  {
    country: 'Uganda',
    region: 'Africa',
    coordinates: [32.2903, 1.3733],
    description: 'Growing healthcare sector driving demand for affordable API supply.',
  },
  {
    country: 'Egypt',
    region: 'Africa',
    coordinates: [30.8025, 26.8206],
    description: 'Largest pharma market in Africa with strong generic manufacturing base.',
  },

  // Middle East
  {
    country: 'Saudi Arabia',
    region: 'Middle East',
    coordinates: [45.0792, 23.8859],
    description: 'Premium market for high-quality pharmaceutical ingredients and specialty APIs.',
  },

  // Europe
  {
    country: 'Germany',
    region: 'Europe',
    coordinates: [10.4515, 51.1657],
    description: 'World-class pharma hub requiring rigorous regulatory-compliant API supply.',
  },
  {
    country: 'Switzerland',
    region: 'Europe',
    coordinates: [8.2275, 46.8182],
    description: 'Global innovator in pharmaceutical R&D with stringent quality requirements.',
  },
  {
    country: 'Spain',
    region: 'Europe',
    coordinates: [-3.7492, 40.4637],
    description: 'Strong generic and branded pharmaceutical manufacturing ecosystem.',
  },
  {
    country: 'Russia',
    region: 'Europe',
    coordinates: [105.3188, 61.524],
    description: 'Large domestic market with significant demand for cost-competitive APIs.',
  },

  // Asia
  {
    country: 'South Korea',
    region: 'Asia',
    coordinates: [127.7669, 35.9078],
    description: 'Advanced pharma sector with high-value API and biologic ingredient needs.',
  },
  {
    country: 'China',
    region: 'Asia',
    coordinates: [104.1954, 35.8617],
    description: 'Massive pharmaceutical market with demand for diverse API categories.',
  },
  {
    country: 'Indonesia',
    region: 'Asia',
    coordinates: [113.9213, -0.7893],
    description: 'Southeast Asia\'s largest pharma market experiencing rapid API demand growth.',
  },
  {
    country: 'Vietnam',
    region: 'Asia',
    coordinates: [108.2772, 14.0583],
    description: 'Fast-growing market for high-quality generic and OTC pharmaceutical ingredients.',
  },
  {
    country: 'Philippines',
    region: 'Asia',
    coordinates: [121.774, 12.8797],
    description: 'Expanding healthcare system driving strong API import demand.',
  },
  {
    country: 'Thailand',
    region: 'Asia',
    coordinates: [100.9925, 15.87],
    description: 'Regional pharmaceutical manufacturing leader with growing API sourcing needs.',
  },
  {
    country: 'Bangladesh',
    region: 'Asia',
    coordinates: [90.3563, 23.685],
    description: 'Rapidly expanding generics sector with significant API import requirements.',
  },
  {
    country: 'Uzbekistan',
    region: 'Asia',
    coordinates: [63.9496, 41.2995],
    description: 'Central Asian growth market for pharmaceutical ingredients and APIs.',
  },
];

export const regions = ['All', 'Latin America', 'Africa', 'Middle East', 'Europe', 'Asia'] as const;
export type Region = (typeof regions)[number];
