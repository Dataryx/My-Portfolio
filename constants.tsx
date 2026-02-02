
import { Project, Skill } from './types';

export const PROJECTS: Project[] = [
  {
    id: '1',
    title: 'Data Warehouse',
    description: 'A comprehensive data Warehouse platform.',
    tags: ['React', 'TypeScript', 'AWS', 'Tailwind'],
    image: 'images/Data-warehouse.png',
    link: 'https://github.com/Dataryx/Data-Warehouse.git',
    github: 'https://github.com/Dataryx/Data-Warehouse.git'
  },
  {
    id: '2',
    title: 'AI Powered Data Warehouse',
    description: 'AI Powered Self Optimizing Data Warehouse that optimizes itself using machine learning algorithms.',
    tags: ['Next.js', 'Solidity', 'D3.js', 'Ethers.js'],
    image: 'images/Self-optimizing-data-warehouse.png',
    link: 'https://github.com/Dataryx/AI_Powered_Self_Optimizing_Data_Warehouse.git',
    github: 'https://github.com/Dataryx/AI_Powered_Self_Optimizing_Data_Warehouse.git'
  },
  {
    id: '3',
    title: 'Data Processing',
    description: 'Data Processing',
    tags: ['Python', 'TensorFlow', 'OpenCV', 'React'],
    image: 'images/Data-processing.png',
    link: 'https://github.com/Dataryx/Data-processing',
    github: 'https://github.com/Dataryx/Data-processing'
  },
  {
    id: '4',
    title: 'Aether OS',
    description: 'A custom operating system kernel concept exploring modular micro-architectures.',
    tags: ['C++', 'Assembly', 'Rust'],
    image: 'https://images.unsplash.com/photo-1518433278981-1127cc340b19?auto=format&fit=crop&q=80&w=800',
    link: '#',
    github: '#'
  },
  {
    id: '5',
    title: 'Cyber-Physic Engine',
    description: 'High-performance 2D physics engine for complex mechanical simulations in the browser.',
    tags: ['WebGL', 'Rust', 'Wasm'],
    image: 'https://images.unsplash.com/photo-1509228468518-180dd4864904?auto=format&fit=crop&q=80&w=800',
    link: '#',
    github: '#'
  },
  {
    id: '6',
    title: 'Grid-Link CMS',
    description: 'Headless content management system with a focus on graph-based data relationships.',
    tags: ['Go', 'Redis', 'GraphQL'],
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=800',
    link: '#',
    github: '#'
  }
];

export const SKILLS: Skill[] = [
  { name: 'Python / SQL', category: 'Data Ingestion', level: 95 },
  { name: 'Batch & Streaming Ingestion', category: 'Data Ingestion', level: 90 },
  { name: 'Apache Kafka / APIs', category: 'Data Ingestion', level: 88 },
  
  { name: 'Data Warehousing (Snowflake / BigQuery / Redshift)', category: 'Data Platforms', level: 92 },
  { name: 'Lakehouse (S3 / GCS + Delta / Iceberg)', category: 'Data Platforms', level: 85 },
  { name: 'Data Modeling (Star & Snowflake Schemas)', category: 'Data Platforms', level: 90 },
  
  { name: 'Apache Airflow', category: 'Data Orchestration', level: 95 },
  { name: 'Workflow Scheduling & Monitoring', category: 'Data Orchestration', level: 88 },
  { name: 'Cloud Platforms (AWS / GCP / Azure)', category: 'Data Orchestration', level: 90 },

  { name: 'Git / GitHub', category: 'Data Tools', level: 92 },
  { name: 'dbt (Transformations & Testing)', category: 'Data Tools', level: 96 },
  { name: 'Data Quality & Observability', category: 'Data Tools', level: 82 },
];
