import { ChevronUpIcon } from '@heroicons/react/24/outline'
import { useEffect } from 'react'
import { Variants, motion, useAnimationControls, useScroll } from 'framer-motion'




const ScrollToTopContainerVariants: Variants = {
	hide: { opacity: 0, y: 150 },
	show: { opacity: 1, y: 0 },
};

export function ScrollToTopButton(){

	const isBrowser = () => typeof window !== 'undefined'; //The approach recommended by Next.js

function scrollToTop() {
	if (!isBrowser()) return;
	window.scrollTo({ top: 0, behavior: "smooth" });
}

	const { scrollYProgress } = useScroll();
	const controls = useAnimationControls();

	useEffect(() => {
			return scrollYProgress.on('change', (latestValue) => {
					if (latestValue > 0.5) {
							controls.start('show');
					} else {
							controls.start('hide');
					}
			});
	});

	return (
			<motion.button
					className="fixed bottom-5 right-5 p-10 rounded-full bg-black/50 p-3 text-white/75 backdrop-blur-lg transition hover:bg-black/75 hover:text-white focus:outline-none"
					variants={ScrollToTopContainerVariants}
					initial="hide"
					animate={controls}
					onClick={scrollToTop}>
					<ChevronUpIcon className="h-6 w-6" />
			</motion.button>
	);
}