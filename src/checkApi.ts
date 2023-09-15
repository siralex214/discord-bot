import axios from "axios";
import { Client } from "discord.js";

export const checkAPI = async (client: Client) => {

  const user = await client.users.fetch(
    process.env.MY_ID_DISCORD ? process.env.MY_ID_DISCORD : ""
  );
  const response = await axios.get(
    `${process.env.API_URL}/discord/suggestions/?API_KEY=kjdsgfsdg4sd54gds6f54bdf15gb65df1v56f4d65df41v12345s`
  );

  if (newDataAvailable(response.data)) {
    const suggestion = newDataAvailable(response.data);

    user?.send(
      `Nouvelle suggestion de ${suggestion.username} : ${suggestion.title}`
    );
  }
};

function newDataAvailable(apiData: { success: boolean; data: any }) {
  if (apiData.success) {
    return apiData.data;
  } else {
    return false;
  }
}
