import React from 'react';
import Banner from './Banner/Banner';
import HomeOverview from './websiteOverview section/HomeOverview';
import AllTab from './Tab/AllTab';
import Testimonials from './testimonial';
import HomeAboutSection from './HomeAboutSection';
import Newsletter from './Newsletter';
import ImageProofBanner from './ImageProofBanner';
import BlogSection from './Blog';
import StatsSection from './trsut-cards';
import GlobeSection from './GlobeSection';

const Home = () => {
    return (
        <div>
            <Banner></Banner>
            <StatsSection></StatsSection>
            <HomeOverview></HomeOverview>
            <AllTab></AllTab>
            <ImageProofBanner></ImageProofBanner>
            <Testimonials></Testimonials>
            <GlobeSection></GlobeSection>
            <HomeAboutSection></HomeAboutSection>
            <BlogSection></BlogSection>
            <Newsletter></Newsletter>
        </div>
    );
};

export default Home;