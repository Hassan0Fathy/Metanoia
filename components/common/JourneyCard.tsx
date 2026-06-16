'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { Card } from '@/components/common/Card';
import { Badge } from '@/components/common/Badge';
import { Button } from '@/components/common/Button';
import { Users, Clock } from 'lucide-react';

interface JourneyCardProps {
  id: string;
  title: string;
  description: string;
  duration: string;
  groupSize: string;
  activities: string[];
  image?: string;
  index?: number;
}

export function JourneyCard({
  id,
  title,
  description,
  duration,
  groupSize,
  activities,
  image,
  index = 0,
}: JourneyCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      viewport={{ once: true, amount: 0.2 }}
      className="h-full"
    >
      <Card className="overflow-hidden h-full flex flex-col hover:shadow-2xl">
        {/* Image Placeholder */}
        {image && (
          <div
            className="w-full h-48 bg-gradient-to-br from-primary-olive to-earth-brown mb-4"
            style={{
              backgroundImage: `url('${image}')`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }}
          />
        )}

        {/* Content */}
        <div className="flex flex-col flex-grow">
          <h3 className="text-headline-md font-serif mb-2 text-primary-olive">
            {title}
          </h3>

          <p className="text-body-md text-on-surface-variant mb-4 flex-grow">
            {description}
          </p>

          {/* Info Row */}
          <div className="flex gap-4 mb-4 text-on-surface-variant">
            <div className="flex items-center gap-2">
              <Clock size={16} />
              <span className="text-body-md">{duration}</span>
            </div>
            <div className="flex items-center gap-2">
              <Users size={16} />
              <span className="text-body-md">{groupSize}</span>
            </div>
          </div>

          {/* Activities */}
          <div className="mb-6">
            <p className="text-label-caps text-on-surface mb-3">Activities</p>
            <div className="flex flex-wrap gap-2">
              {activities.map((activity, i) => (
                <Badge key={i} variant="outlined" className="text-xs">
                  {activity}
                </Badge>
              ))}
            </div>
          </div>

          {/* CTA */}
          <Link href={`/reservation?journey=${id}`} className="mt-auto">
            <Button size="md" fullWidth>
              Explore Journey
            </Button>
          </Link>
        </div>
      </Card>
    </motion.div>
  );
}
