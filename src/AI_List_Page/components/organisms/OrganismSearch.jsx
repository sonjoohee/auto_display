
  // 검색 관련 atoms
  const [searchKeyword, setSearchKeyword] = useAtom(SEARCH_KEYWORD);
  const [searchTime, setSearchTime] = useAtom(SEARCH_TIME);
  const [searchGender, setSearchGender] = useAtom(SEARCH_GENDER);
  const [searchAge, setSearchAge] = useAtom(SEARCH_AGE);
  const [searchMarriage, setSearchMarriage] = useAtom(SEARCH_MARRIAGE);
  const [searchChild, setSearchChild] = useAtom(SEARCH_CHILD);
  const [searchConsumption, setSearchConsumption] = useAtom(SEARCH_CONSUMPTION);
  const [searchTechnology, setSearchTechnology] = useAtom(SEARCH_TECHNOLOGY);

  const [viewMode, setViewMode] = useState("card");
  const [isAllSelected, setIsAllSelected] = useState(false);

  const [showDetailOption, setShowDetailOption] = useState(false);
  const [showTimeOption, setShowTimeOption] = useState(false);
  const [selectedFilters, setSelectedFilters] = useState({
    keyword: "",
    time: "",
    gender: "",
    age: "",
    marriage: "",
    child: "",
    consumption: "",
    technology: "",
  });

  // 전체 AI 패널 수
  useEffect(() => {
    const fetchPanelCount = async () => {
      console.log("process.env.REACT_APP_SERVER_URL", process.env.REACT_APP_SERVER_URL);
      try {
        const response = await axios.get(`${process.env.REACT_APP_SERVER_URL}/users/hello`);
        setTotalPanelCount(response.data.value);
      } catch (error) {
        console.error("Error fetching panel count:", error);
      }
    };

    fetchPanelCount();
  }, [setTotalPanelCount]);


const handleSearch = () => {
    const searchParams = {
      searchKeyword,
      searchTime,
    };

    console.log(searchParams);
    setSelectedPanelCount(0);
    // axios.post(`${process.env.REACT_APP_SERVER_URL}/panels/search`, searchParams)
    //   .then(response => {
    //     setPanelList(response.data);
    //   })
    //   .catch(error => {
    //     console.error("Error fetching filtered panel list:", error);
    //   });

    // 상세 옵션 필터링
    setFilteredPanelList(panelList.filter(panel => {
      const isGenderMatch = panel.gender === searchGender || searchGender === "";
      const isAgeMatch = searchAge.includes(Math.floor(panel.age / 10) * 10) || searchAge === "";
      return isGenderMatch && isAgeMatch}));
  };






    // 전체 선택 상태관리
    const handleSelectAllPanel = () => {
        setFilteredPanelList((prevList) => {
          const allSelected = prevList.every(panel => panel.selected);
          const updatedList = prevList.map((panel) => {
            return { ...panel, selected: !allSelected };
          });
          setSelectedPanelCount(allSelected ? 0 : updatedList.length);
          // console.log(updatedList)
          return updatedList;
        });
      };