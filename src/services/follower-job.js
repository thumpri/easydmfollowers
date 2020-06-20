import db from '../models';
import { FOLLOWERS_JOB } from '../constants'

export const closeActiveJob = async (activeJob) => {
    activeJob.status = FOLLOWERS_JOB.DONE;
    activeJob.ran_at = new Date();
    await activeJob.save();
}

export const scheduleNewJob = async ({ cursor, scheduled }) => {
    const activeJob = await getActiveJob();
    const newJob = await db.FollowersJob.create({
        cursor,
        scheduled,
        status: FOLLOWERS_JOB.SCHEDULED
    });
    if (activeJob)
        await closeActiveJob(activeJob);
    return newJob;
}

export const getActiveJob = async () => {
    // TBD : need to handle the case if there are 2 active jobs
    return await db.FollowersJob.findOne({
        where: {
            status: FOLLOWERS_JOB.SCHEDULED
        }
    });
}
