import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, MapPin, Navigation, X, Clock3 } from 'lucide-react';
import { QUICK_SEARCH_SUGGESTIONS } from '../data/directoryData';

const RECENT_SEARCHES_KEY = 'r-interiors-recent-searches';
const DEFAULT_LOCATION = 'Deerfield Beach, FL 33441';

export function DirectorySearch({
  initialQuery = '',
  initialLocation = DEFAULT_LOCATION,
  onSearchSubmit,
  compact = false,
}) {
  const navigate = useNavigate();
  const [query, setQuery] = useState(initialQuery);
  const [locationText, setLocationText] = useState(initialLocation);
  const [showQueryMenu, setShowQueryMenu] = useState(false);
  const [showLocMenu, setShowLocMenu] = useState(false);
  const [locating, setLocating] = useState(false);
  const [queryError, setQueryError] = useState('');
  const [recentSearches, setRecentSearches] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem(RECENT_SEARCHES_KEY) || '[]');
    } catch {
      return [];
    }
  });

  const filteredSuggestions = QUICK_SEARCH_SUGGESTIONS.filter((item) =>
    item.label.toLowerCase().includes(query.trim().toLowerCase())
  );

  const saveRecentSearch = (search) => {
    const updated = [
      search,
      ...recentSearches.filter(
        (item) => item.query.toLowerCase() !== search.query.toLowerCase()
      ),
    ].slice(0, 5);
    setRecentSearches(updated);
    try {
      localStorage.setItem(RECENT_SEARCHES_KEY, JSON.stringify(updated));
    } catch {
      // Recent searches are optional when browser storage is unavailable.
    }
  };

  const handleUseCurrentLocation = () => {
    setShowLocMenu(false);
    if (!navigator.geolocation) {
      setLocationText('Deerfield Beach, FL 33441');
      return;
    }
    setLocating(true);
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setLocating(false);
        setLocationText(
          `${pos.coords.latitude.toFixed(2)}, ${pos.coords.longitude.toFixed(2)}`
        );
      },
      () => {
        setLocating(false);
        setLocationText('Deerfield Beach, FL 33441');
      },
      { timeout: 5000 }
    );
  };

  const handleSubmit = (e) => {
    e?.preventDefault();
    if (!query.trim()) {
      setQueryError('Enter a service or keyword to search.');
      return;
    }
    setQueryError('');
    setShowQueryMenu(false);
    setShowLocMenu(false);
    const search = { query: query.trim(), location: locationText.trim() };
    saveRecentSearch(search);

    if (onSearchSubmit) {
      onSearchSubmit(search);
      return;
    }

    navigate('/directory', {
      state: search,
    });
  };

  const handlePickSuggestion = (item) => {
    setQuery(item.label);
    setQueryError('');
    setShowQueryMenu(false);
    const search = { query: item.label, location: locationText.trim() };
    saveRecentSearch(search);
    if (onSearchSubmit) onSearchSubmit(search);
    else navigate('/directory', { state: search });
  };

  const handlePickRecent = (search) => {
    setQuery(search.query);
    setLocationText(search.location);
    setShowQueryMenu(false);
    if (onSearchSubmit) onSearchSubmit(search);
    else navigate('/directory', { state: search });
  };

  const clearSearch = () => {
    setQuery('');
    setLocationText(DEFAULT_LOCATION);
    setQueryError('');
    setShowQueryMenu(false);
    if (onSearchSubmit) onSearchSubmit({ query: '', location: DEFAULT_LOCATION });
  };

  return (
    <form onSubmit={handleSubmit} className="w-full relative">
      <div className="bg-white rounded-2xl border border-[#C7C7C7]/70 shadow-sm p-2 space-y-2">
        {/* What are you looking for */}
        <div className="relative">
          <div className="flex items-center gap-2.5 px-3 py-2 rounded-xl bg-[#F8F9FA] border border-transparent focus-within:border-[#A71912] focus-within:bg-white transition-colors">
            <Search className="w-4 h-4 text-[#A71912] shrink-0" />
            <label htmlFor={compact ? 'home-dir-search' : 'dir-search'} className="sr-only">
              Search services or businesses
            </label>
            <input
              id={compact ? 'home-dir-search' : 'dir-search'}
              type="text"
              value={query}
              onFocus={() => {
                setShowQueryMenu(true);
                setShowLocMenu(false);
              }}
              onChange={(e) => {
                setQuery(e.target.value);
                setQueryError('');
                setShowQueryMenu(true);
              }}
              placeholder="I'm looking for... (e.g. Stucco, Drywall)"
              autoComplete="off"
              className="w-full bg-transparent text-xs font-medium text-[#171717] placeholder:text-neutral-400 focus:outline-none"
            />
            {query && (
              <button
                type="button"
                aria-label="Clear search"
                onClick={clearSearch}
                className="p-1 text-neutral-500 hover:text-[#171717] cursor-pointer"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          {showQueryMenu && (
            <ul className="mt-1 z-30 bg-white rounded-xl border border-[#C7C7C7]/70 shadow-lg max-h-52 overflow-y-auto divide-y divide-neutral-100">
              {query.trim() ? (
                filteredSuggestions.length > 0 ? filteredSuggestions.map((item) => (
                  <li key={item.id}>
                    <button
                      type="button"
                      onClick={() => handlePickSuggestion(item)}
                      className="w-full px-3.5 py-2.5 flex items-center justify-between text-left hover:bg-neutral-50 transition-colors cursor-pointer"
                    >
                      <span className="flex items-center gap-2.5 text-xs font-semibold text-[#171717]">
                        <Search className="w-3.5 h-3.5 text-[#A71912]" />
                        {item.label}
                      </span>
                      <span className="text-[10px] font-bold uppercase tracking-wider text-neutral-400">
                        R Interiors
                      </span>
                    </button>
                  </li>
                )) : (
                  <li className="px-3.5 py-2.5 text-xs text-neutral-500">No matching service suggestions</li>
                )
              ) : (
                <>
                  {recentSearches.length > 0 && (
                    <li className="px-3.5 py-2 text-[10px] font-bold uppercase tracking-wider text-neutral-400">Recent searches</li>
                  )}
                  {recentSearches.map((item, index) => (
                    <li key={`${item.query}-${index}`}>
                      <button type="button" onClick={() => handlePickRecent(item)} className="w-full px-3.5 py-2.5 flex items-center gap-2 text-left text-xs font-semibold text-[#171717] hover:bg-neutral-50 cursor-pointer">
                        <Clock3 className="w-3.5 h-3.5 text-neutral-400" />
                        <span className="flex-1">{item.query}</span>
                        <span className="text-[10px] text-neutral-400">{item.location}</span>
                      </button>
                    </li>
                  ))}
                  <li className="px-3.5 py-2 text-[10px] font-bold uppercase tracking-wider text-neutral-400">Popular searches</li>
                  {QUICK_SEARCH_SUGGESTIONS.map((item) => (
                    <li key={item.id}>
                      <button type="button" onClick={() => handlePickSuggestion(item)} className="w-full px-3.5 py-2.5 flex items-center gap-2 text-left text-xs font-semibold text-[#171717] hover:bg-neutral-50 cursor-pointer">
                        <Search className="w-3.5 h-3.5 text-[#A71912]" />{item.label}
                      </button>
                    </li>
                  ))}
                </>
              )}
            </ul>
          )}
          {queryError && <p role="alert" className="mt-1 px-2 text-[11px] font-medium text-[#A71912]">{queryError}</p>}
        </div>

        {/* Location + Search Button */}
        <div className="flex items-center gap-2">
          <div className="relative flex-1">
            <div className="flex items-center gap-2 px-3 py-2 rounded-xl bg-[#F8F9FA] border border-transparent focus-within:border-[#A71912] focus-within:bg-white transition-colors">
              <MapPin className="w-4 h-4 text-[#A71912] shrink-0" />
              <label htmlFor={compact ? 'home-dir-loc' : 'dir-loc'} className="sr-only">
                City, State, Zip
              </label>
              <input
                id={compact ? 'home-dir-loc' : 'dir-loc'}
                type="text"
                value={locating ? 'Detecting location...' : locationText}
                onFocus={() => {
                  setShowLocMenu(true);
                  setShowQueryMenu(false);
                }}
                onChange={(e) => setLocationText(e.target.value)}
                placeholder="City, State, Zip"
                autoComplete="off"
                className="w-full bg-transparent text-xs font-medium text-[#171717] placeholder:text-neutral-400 focus:outline-none"
              />
            </div>

            {showLocMenu && (
              <div className="absolute left-0 right-0 top-full mt-1 z-30 bg-white rounded-xl border border-[#C7C7C7]/70 shadow-lg overflow-hidden">
                <button
                  type="button"
                  onClick={handleUseCurrentLocation}
                  className="w-full px-3.5 py-2.5 flex items-center gap-2 text-xs font-bold text-[#A71912] hover:bg-neutral-50 cursor-pointer"
                >
                  <Navigation className="w-3.5 h-3.5" />
                  Use Current Location
                </button>
              </div>
            )}
          </div>

          <button
            type="submit"
            aria-label="Search"
            className="px-4 py-2 rounded-xl bg-[#A71912] hover:bg-[#87120C] text-white text-xs font-bold flex items-center gap-1.5 shadow-sm transition-colors cursor-pointer shrink-0"
          >
            <Search className="w-3.5 h-3.5" />
            Search
          </button>
        </div>
      </div>
    </form>
  );
}
