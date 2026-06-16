'use client';

import { motion } from 'framer-motion';
import { Card } from '@/components/common/Card';
import { Badge } from '@/components/common/Badge';

interface ExperienceCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  category?: string;
  index?: number;
}

export function ExperienceCard({
  icon,
  title,
  description,
  category,
  index = 0,
}: ExperienceCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      viewport={{ once: true, amount: 0.2 }}
    >
      <Card className="h-full flex flex-col">
        <div className="text-5xl text-primary-olive mb-4">{icon}</div>
        
        {category && (
          <Badge variant="secondary" className="mb-4 w-fit">
            {category}
          </Badge>
        )}
        
        <h3 className="text-headline-sm font-serif mb-3 text-primary-olive">
          {title}
        </h3>
        
        <p className="text-body-md text-on-surface-variant flex-grow">
          {description}
        </p>
      </Card>
    </motion.div>
  );
}
