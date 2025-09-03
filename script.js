// Prevent scrolling during animation
function preventScroll(e) {
    e.preventDefault();
    e.stopPropagation();
    return false;
}

function initLocomotive() {
    try {
        // Ensure body overflow stays hidden
        document.body.style.overflow = 'hidden';
        
        const scroll = new LocomotiveScroll({
            el: document.querySelector('.main2'),
            smooth: true,
            smartphone: { smooth: true },
            tablet: { smooth: true },
            lerp: 0.1,
            multiplier: 1
        });
        
        // Update Locomotive after images load to correct heights
        window.addEventListener('load', () => {
            try { scroll.update(); } catch (e) {}
        });
        setTimeout(() => { try { scroll.update(); } catch (e) {} }, 500);
        
        // Store scroll instance globally for debugging
        window.locomotiveScroll = scroll;
    } catch (e) {
        console.error('Locomotive initialization failed:', e);
    }
}

if (window.innerWidth >= 1000) {
    // Add scroll prevention
    document.addEventListener('wheel', preventScroll, { passive: false });
    document.addEventListener('touchmove', preventScroll, { passive: false });
    document.addEventListener('keydown', function(e) {
        if (e.key === 'ArrowDown' || e.key === 'ArrowUp' || e.key === 'PageDown' || e.key === 'PageUp' || e.key === ' ') {
            e.preventDefault();
        }
    });

    var tl = gsap.timeline()

    tl.to("#main",{
        y:"90vh",
        duration:0,
        scale:0.3,

    })
    tl.to("#main",{
        y:"-60vh",
        duration:1.5,
        delay:.6,
        ease:"power4.out"
        
    })
    tl.to("#main",{
       scale:1,
       duration:3,
       delay:.4,
       rotate:360,
        ease:"power4.out",
        y:"0vh"
    })

    // STRICTLY show scrollbar only after animation completes
    tl.to("body", {
        duration: 0,
        onComplete: function() {
            // Remove scroll prevention
            document.removeEventListener('wheel', preventScroll);
            document.removeEventListener('touchmove', preventScroll);
            
            // Wait a bit more to ensure animation is completely done
            setTimeout(() => {
                // Enable scrolling on main container
                document.querySelector('.main2').classList.add('scroll-enabled');
                
                // Initialize Locomotive scroll
                initLocomotive();
            }, 100);
        }
    })
} else {
    // For small screens, skip animation and allow scrolling immediately
    document.querySelector('.main2').classList.add('scroll-enabled');
    initLocomotive();
}