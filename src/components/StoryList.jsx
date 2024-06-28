import React, { useState } from 'react';
import { useQuery } from 'react-query';
import StoryCard from './StoryCard';
import { Input } from '@/components/ui/input';
import { Skeleton } from '@/components/ui/skeleton';

const fetchTopStories = async () => {
  const response = await fetch('https://hacker-news.firebaseio.com/v0/topstories.json');
  const storyIds = await response.json();
  const stories = await Promise.all(
    storyIds.slice(0, 100).map(async (id) => {
      const storyResponse = await fetch(`https://hacker-news.firebaseio.com/v0/item/${id}.json`);
      return storyResponse.json();
    })
  );
  return stories;
};

const StoryList = () => {
  const { data, isLoading } = useQuery('topStories', fetchTopStories);
  const [searchTerm, setSearchTerm] = useState('');

  const filteredStories = data?.filter((story) =>
    story.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <Input
        type="text"
        placeholder="Search stories..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="mb-4"
      />
      {isLoading ? (
        <Skeleton className="h-20 w-full mb-4" count={10} />
      ) : (
        filteredStories?.map((story) => <StoryCard key={story.id} story={story} />)
      )}
    </div>
  );
};

export default StoryList;