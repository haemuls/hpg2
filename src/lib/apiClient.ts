// lib/apiClient.ts

export interface ActiveUserData {
  userId: string;
  problemId: string;
}

export async function fetchProblemTitles(
  token: string,
  problemIds: number[],
  membershipId: string
): Promise<Record<number, string>> {
  const titles: Record<number, string> = {};

  try {
    const response = await fetch(
      `https://ec2-3-34-134-27.ap-northeast-2.compute.amazonaws.com/api/problems/completed?userId=${membershipId}&type=WARGAME&kind=&sortKind=&desc=true&page=0&size=25`,
      {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: 'application/json',
        },
      }
    );

    if (response.ok) {
      const data = await response.json();
      data.content.forEach((item: { id: number; title: string }) => {
        if (problemIds.includes(item.id)) {
          titles[item.id] = item.title;
        }
      });
    } else {
      console.error('Failed to fetch problem titles:', response.status);
    }
  } catch (error) {
    console.error('Error fetching problem titles:', error);
  }

  return titles;
}

export async function fetchActiveUsers(token: string): Promise<ActiveUserData[]> {
  try {
    const response = await fetch(
      'https://ec2-3-34-134-27.ap-northeast-2.compute.amazonaws.com/api/pods/active?namespace=wargame',
      {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: 'application/json',
        },
      }
    );

    if (response.ok) {
      const data = await response.json();
      return data;
    } else {
      console.error('Failed to fetch active users:', response.status);
      return [];
    }
  } catch (error) {
    console.error('Error fetching active users:', error);
    return [];
  }
}
