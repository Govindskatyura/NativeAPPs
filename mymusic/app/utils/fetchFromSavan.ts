import axios from "axios";

interface MoreInfo {
    fan_count?: string;
    lyrics_id?: string;
    webp?: string;
    uid?: string;
}

interface ButtonTooltipInfo {}

interface NewTrending {
    id: string;
    title: string;
    subtitle: string;
    header_desc: string;
    type: string;
    perma_url: string;
    image: string;
    language: string;
    year: string;
    play_count: string;
    explicit_content: string;
    list_count: string;
    list_type: string;
    list: string;
    more_info: MoreInfo;
    modules: null;
    button_tooltip_info: ButtonTooltipInfo[];
}

interface TopPlaylists {
    id: string;
    title: string;
    subtitle: string;
    type: string;
    image: string;
    perma_url: string;
    more_info: MoreInfo;
    explicit_content: string;
    mini_obj: boolean;
}

interface NewAlbums extends NewTrending {}

interface BrowseDiscover {
    id: string;
    title: string;
    subtitle: string;
    type: string;
    image: string;
    perma_url: string;
    more_info: MoreInfo;
    explicit_content: string;
    mini_obj: boolean;
}

interface GlobalConfig {
    weekly_top_songs_listid: Record<string, unknown>;
    random_songs_listid: Record<string, unknown>;
    phn_otp_providers: Record<string, string>;
}

interface Charts {
    id: string;
    image: string;
    title: string;
    type: string;
    count: number;
    perma_url: string;
    more_info: Record<string, unknown>;
}

interface Radio {
    id: string;
    title: string;
    subtitle: string;
    type: string;
    image: string;
    perma_url: string;
    more_info: Record<string, unknown>;
    explicit_content: string;
    mini_obj: boolean;
}

interface ArtistRecos {
    id: string;
    title: string;
    subtitle: string;
    type: string;
    image: string;
    perma_url: string;
    more_info: Record<string, unknown>;
    explicit_content: string;
    mini_obj: boolean;
}

interface TagMixes {
    subtitle: string;
    description: string;
    id: string;
    title: string;
    header_desc: string;
    type: string;
    perma_url: string;
    image: string;
    language: string;
    year: string;
    play_count: string;
    explicit_content: string;
    list_count: string;
    list_type: string;
    list: string;
    more_info: Record<string, unknown>;
    button_tooltip_info: ButtonTooltipInfo[];
}

interface PromoVXData {
    id: string;
    type: string;
    title: string;
    subtitle: string;
    secondary_subtitle: string;
    image: string;
    mini_obj: boolean;
    perma_url: string;
    explicit_content: string;
    more_info: Record<string, unknown>;
}

interface FetchFromSavanResponse {
    history: unknown[];
    new_trending: NewTrending[];
    top_playlists: TopPlaylists[];
    new_albums: NewAlbums[];
    browse_discover: BrowseDiscover[];
    global_config: GlobalConfig;
    charts: Charts[];
    radio: Radio[];
    artist_recos: ArtistRecos[];
    tag_mixes: TagMixes[];
    "promo:vx:data:68": PromoVXData[];
    "promo:vx:data:185": PromoVXData[];
    "promo:vx:data:114": PromoVXData[];
    "promo:vx:data:116": PromoVXData[];
    "promo:vx:data:142": PromoVXData[];
    "promo:vx:data:211": PromoVXData[];
}

export async function fetchData() {
    const url = 'https://www.jiosaavn.com/api.php?__call=webapi.getLaunchData&api_version=4&_format=json&_marker=0&ctx=wap6dot0';
    const options = {
        method: 'GET',
        headers: {
            'Accept': 'application/json, text/plain, */*',
            'Accept-Language': 'en-GB,en;q=0.9',
            'Connection': 'keep-alive',
            'Referer': 'https://www.jiosaavn.com/',
            'Sec-Fetch-Dest': 'empty',
            'Sec-Fetch-Mode': 'cors',
            'Sec-Fetch-Site': 'same-origin',
            'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36',
            'sec-ch-ua': '"Google Chrome";v="131", "Chromium";v="131", "Not_A Brand";v="24"',
            'sec-ch-ua-mobile': '?0',
            'sec-ch-ua-platform': '"macOS"'
        }
    };

    try {
        const response = await axios.get<FetchFromSavanResponse>(url, options);
        const result = response.data;
        return result;
        // setData(result); // Assuming setData is a function to handle the fetched data
    } catch (err) {
        // setError('Error fetching data'); // Assuming setError is a function to handle errors
        console.error('Error fetching data:', err);
        return null;
    }
}
