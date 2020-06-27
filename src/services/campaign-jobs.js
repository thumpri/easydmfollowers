import db from '../models';
import { CAMPAIGN_JOB_STATUS } from '../constants';

export const createCampaignJob = async ({ campaign_id }) => {
    return await db.CampaignJobHistory.create({
        campaign_id,
        ran_at: new Date(),
        status: CAMPAIGN_JOB_STATUS.SUCCESS
    });
}
