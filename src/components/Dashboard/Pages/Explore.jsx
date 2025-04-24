import React, { useState, useEffect, useRef, useCallback } from 'react';
import FetchData from "../../../reuse/FetchData";
import FriendPost from "../Posts/FriendPost";
import FriendTemplate from "../Posts/FriendTemplate";
import SendDataGeneral from "../../../reuse/SendDataGeneral";
import { API_URL } from "../../../config";

const Explore = ({ filter }) => {
    const [explore, setExplore] = useState([]);
    const [pagination, setPagination] = useState({
        current_page: 1,
        per_page: 10,
        total: 0,
        last_page: 1,
    });
    const [isLoading, setIsLoading] = useState(false);

    // Use a ref to keep track of the current page
    const currentPageRef = useRef(1);

    const observerRef = useRef([]);

    const fetch = useCallback(async (page = 1, selectedFilter = filter) => {
        try {
            console.log(page);
            setIsLoading(true);
            const response = await FetchData(`${API_URL}/api/authenticated/explore?page=${page}&filter=${selectedFilter}`);
            setExplore((prev) => page === 1 ? response.items : [...prev, ...response.items]);
            setPagination(response.pagination);
            setIsLoading(false);
            console.log(response);
        } catch (error) {
            console.log(error);
            setIsLoading(false);
        }
    }, [filter]);

    useEffect(() => {
        setExplore([]);
        setPagination((prev) => ({ ...prev, current_page: 1 }));
        currentPageRef.current = 1;  // Reset the page reference when filter changes
        fetch(1, filter);
    }, [filter, fetch]);

    const likePost = async (id) => {
        try {
            const response = await SendDataGeneral({ id }, `${API_URL}/api/authenticated/postLike`);
            console.log(response);
        } catch (error) {
            console.log(error);
        }
    };

    const likeTemplate = async (id) => {
        try {
            const response = await SendDataGeneral({ id }, `${API_URL}/api/authenticated/templateLike`);
            console.log(response);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        const observer = new IntersectionObserver(([entry]) => {
            console.log(entry);  // Log entry to see what the observer is detecting
            if (entry.isIntersecting) {
                console.log("10th post in view, fetching next page...");
                if (pagination.current_page < pagination.last_page && !isLoading) {
                    const nextPage = currentPageRef.current + 1;
                    fetch(nextPage); // Fetch the next page of data
                    currentPageRef.current = nextPage; // Update current page in ref
                }
            }
        }, { threshold: 0.1 });  // Set threshold to 0.1 for 10% visibility (adjustable)

        // Attach observer to every 10th item
        observerRef.current.forEach((element, index) => {
            if (index % 10 === 9 && element) {  // Only observe the 10th item (index 9, 19, 29, ...)
                console.log(`Observing element ${index}`);
                observer.observe(element);
            }
        });

        // Cleanup observer on component unmount or when explore changes
        return () => {
            observer.disconnect();
        };
    }, [explore, pagination, fetch, isLoading]);

    return (
        <div className="flex flex-col gap-6">
            {explore.map((item, index) => {
                const isTarget = index % 10 === 9;  // Every 10th item (index 9, 19, 29, ...)

                return item.template ? (
                    <FriendPost
                        key={index}
                        name={item.user.name}
                        image={item.user.image}
                        title={item.title}
                        date={new Date(item.created_at).toLocaleDateString()}
                        user_id={item.user.id}
                        template={item.template_used}
                        answers={item.answers}
                        post_image={item.image}
                        like={() => likePost(item.id)}
                        liked={item.liked}
                        post_id={item.id}
                        tags={item.tags}
                        ref={(el) => {
                            if (isTarget) observerRef.current[index] = el;
                        }}
                    />
                ) : (
                    <FriendTemplate
                        key={index}
                        name={item.user.name}
                        image={item.user.image}
                        title={item.title}
                        date={new Date(item.created_at).toLocaleDateString()}
                        user_id={item.user.id}
                        questions={item.questions}
                        description={item.description}
                        like={() => likeTemplate(item.id)}
                        liked={item.liked}
                        template_id={item.id}
                        ref={(el) => {
                            if (isTarget) observerRef.current[index] = el;
                        }}
                    />
                );
            })}
            {isLoading && (
                <div className="text-center text-sm text-gray-500">Loading more...</div>
            )}
        </div>
    );
};

export default Explore;
