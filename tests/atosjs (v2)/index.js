import { GiftManager, TimeFormat } from "../../packages/AtosJS/lib/index.js";
// import { GiftManager, TimeFormat } from "atosjs";

const t = new TimeFormat();

// GiftManager
async function gift() {
    const gm = new GiftManager({
        fileName: 'using-bun',
        fileType: 2
    });

    const giftId = await gm.generate({
        type: 'test',
        value: 'test giftId in string',
        maxRedeem: 3,
        edit: {
            code: 'BUN_TEST'
        }
    });

    console.log({ 
        giftID: giftId,
        giftView: await gm.view(giftId),
        giftRedeem: await gm.redeem(giftId),
        giftRedeem2: await gm.redeem(giftId),
        giftRedeem3: await gm.redeem(giftId),
        giftRedeemError: await gm.redeem(giftId)
    });

    
};
gift();

// TimeFormat
async function timer() {
    const t = new TimeFormat();
    const activeIntervals = [];
    const activeTimeouts = [];

    // Function to stop all intervals and timeouts
    function stopAll() {
        activeIntervals.forEach(clearInterval);
        activeTimeouts.forEach(clearTimeout);
        console.log('All timers stopped after 3 minutes.');
    }

    // Stop all tests after 3 minutes (180000 ms)
    setTimeout(stopAll, 180000);

    // ========================
    // 1. Test: convertToMilliseconds
    // ========================
    console.log('=== Testing convertToMilliseconds ===');
    try {
        console.log('5s in ms:', t.convertToMilliseconds('5s')); // Expected: 5000
        console.log('1m in ms:', t.convertToMilliseconds('1m')); // Expected: 60000
        console.log('2h in ms:', t.convertToMilliseconds('2h')); // Expected: 7200000
    } catch (error) {
        console.error('convertToMilliseconds failed:', error);
    }

    // =======================
    // 2. Test: Periodic Callbacks (every, repeatInfinite)
    // =======================
    console.log('=== Testing Periodic Callbacks (every, repeatInfinite) ===');
    try {
        // every() - Repeats every 5 seconds
        const interval1 = t.every('5s', () => console.log('This runs every 5 seconds.'));
        activeIntervals.push(interval1);

        // repeatInfinite() - Repeats every 10 seconds
        const interval2 = t.repeatInfinite('10s', () => console.log('This runs every 10 seconds infinitely.'));
        activeIntervals.push(interval2);
    } catch (error) {
        console.error('Periodic Callbacks failed:', error);
    }

    // =======================
    // 3. Test: Timed Execution (after, countdown)
    // =======================
    console.log('=== Testing Timed Execution (after, countdown) ===');
    try {
        // after() - Executes after 5 seconds
        const timeout1 = t.after('5s', () => console.log('Executed after 5 seconds.'));
        activeTimeouts.push(timeout1);

        // countdown() - Executes after a 10-second countdown
        const timeout2 = t.countdown('10s', () => console.log('Countdown complete.'));
        activeTimeouts.push(timeout2);
    } catch (error) {
        console.error('Timed Execution failed:', error);
    }

    // =======================
    // 4. Test: Elapsed Time (elapsedSince)
    // =======================
    console.log('=== Testing Elapsed Time (elapsedSince) ===');
    try {
        // elapsedSince() - Should show the elapsed time since 10 seconds ago
        const timestamp = Date.now() - 10000; // 10 seconds ago
        console.log('Elapsed time since 10 seconds ago:', t.elapsedSince(timestamp)); // Expected: ~10000 ms
    } catch (error) {
        console.error('elapsedSince() failed:', error);
    }

    // =======================
    // 5. Test: Repeated Execution (repeat)
    // =======================
    console.log('=== Testing repeat (3 times every 5s) ===');
    try {
        // repeat() - Repeat 3 times with 5 seconds interval
        const interval3 = t.repeat(3, '5s', () => console.log('Repeated function.'));
        activeIntervals.push(interval3);
    } catch (error) {
        console.error('repeat() failed:', error);
    }

    // =======================
    // 6. Test: Daily Execution (dailyAt)
    // =======================
    console.log('=== Testing dailyAt (callback at specific time) ===');
    try {
        // dailyAt() - Executes a callback at a specific time (e.g., 10 seconds from now)
        const now = new Date();
        const timeout3 = t.dailyAt(now.getHours(), now.getMinutes() + 1, () => {
            console.log(`Ran daily at ${now.getHours()}:${now.getMinutes() + 1}`);
        });
        activeTimeouts.push(timeout3);
    } catch (error) {
        console.error('dailyAt() failed:', error);
    }

    // =======================
    // 7. Test: Convert from Milliseconds (convertFromMilliseconds)
    // =======================
    console.log('=== Testing convertFromMilliseconds ===');
    try {
        // convertFromMilliseconds() - Converts milliseconds back to human-readable format
        const ms = 10000; // 10 seconds
        console.log(`10000 ms = ${t.convertFromMilliseconds(ms)}`); // Expected: "0h 0m 10s"
    } catch (error) {
        console.error('convertFromMilliseconds() failed:', error);
    }
}
timer();