import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { format } from 'date-fns';

const StoryCard = ({ story }) => {
  const formattedDate = format(new Date(story.time * 1000), 'PPP');

  return (
    <Card className="mb-4">
      <CardHeader>
        <CardTitle>{story.title}</CardTitle>
        <CardDescription>Upvotes: {story.score}</CardDescription>
        <CardDescription>Date: {formattedDate}</CardDescription>
      </CardHeader>
      <CardContent>
        <Button as="a" href={story.url} target="_blank" rel="noopener noreferrer">
          Read more
        </Button>
      </CardContent>
    </Card>
  );
};

export default StoryCard;