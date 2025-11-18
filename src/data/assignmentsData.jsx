const assignmentsData = [
  {"name": "Circuit Lab", "subject": "ECE 252", "duedate": "11/16/2025", "status": "todo", "notes": "", "startdate": "", "enddate": ""},
  {"name": "Digital Logic Homework", "subject": "ECE 252", "duedate": "11/21/2025", "status": "todo", "notes": "", "startdate": "", "enddate": ""},
  {"name": "Embedded Systems Practice", "subject": "ECE 252", "duedate": "11/26/2025", "status": "todo", "notes": "", "startdate": "", "enddate": ""},
  {"name": "Signal Analysis Task", "subject": "ECE 252", "duedate": "12/01/2025", "status": "todo", "notes": "", "startdate": "", "enddate": ""},
  {"name": "FPGA Exercise", "subject": "ECE 252", "duedate": "12/06/2025", "status": "todo", "notes": "", "startdate": "", "enddate": ""},
  {"name": "Hardware Debugging", "subject": "ECE 252", "duedate": "12/11/2025", "status": "todo", "notes": "", "startdate": "", "enddate": ""},
  {"name": "Circuit Optimization", "subject": "ECE 252", "duedate": "12/16/2025", "status": "todo", "notes": "", "startdate": "", "enddate": ""},

  {"name": "ML Pipeline Homework", "subject": "COMP SCI 571", "duedate": "11/16/2025", "status": "todo", "notes": "", "startdate": "", "enddate": ""},
  {"name": "Neural Network Practice", "subject": "COMP SCI 571", "duedate": "11/21/2025", "status": "todo", "notes": "", "startdate": "", "enddate": ""},
  {"name": "Data Prep Assignment", "subject": "COMP SCI 571", "duedate": "11/26/2025", "status": "todo", "notes": "", "startdate": "", "enddate": ""},
  {"name": "Model Evaluation Task", "subject": "COMP SCI 571", "duedate": "12/01/2025", "status": "todo", "notes": "", "startdate": "", "enddate": ""},
  {"name": "Clustering Exercise", "subject": "COMP SCI 571", "duedate": "12/06/2025", "status": "todo", "notes": "", "startdate": "", "enddate": ""},
  {"name": "Classification Practice", "subject": "COMP SCI 571", "duedate": "12/11/2025", "status": "todo", "notes": "", "startdate": "", "enddate": ""},
  {"name": "Deep Learning Notes", "subject": "COMP SCI 571", "duedate": "12/16/2025", "status": "todo", "notes": "", "startdate": "", "enddate": ""},

  {"name": "Cell Biology Worksheet", "subject": "BIO 330", "duedate": "11/16/2025", "status": "todo", "notes": "", "startdate": "", "enddate": ""},
  {"name": "Gene Expression Homework", "subject": "BIO 330", "duedate": "11/21/2025", "status": "todo", "notes": "", "startdate": "", "enddate": ""},
  {"name": "Protein Structure Notes", "subject": "BIO 330", "duedate": "11/26/2025", "status": "todo", "notes": "", "startdate": "", "enddate": ""},
  {"name": "Metabolism Worksheet", "subject": "BIO 330", "duedate": "12/01/2025", "status": "todo", "notes": "", "startdate": "", "enddate": ""},
  {"name": "Cell Division Review", "subject": "BIO 330", "duedate": "12/06/2025", "status": "todo", "notes": "", "startdate": "", "enddate": ""},
  {"name": "Genetics Practice", "subject": "BIO 330", "duedate": "12/11/2025", "status": "todo", "notes": "", "startdate": "", "enddate": ""},
  {"name": "Genetics Worksheet", "subject": "BIO 330", "duedate": "12/16/2025", "status": "todo", "notes": "", "startdate": "", "enddate": ""},

  {"name": "Metadata Assignment", "subject": "L I S 440", "duedate": "11/16/2025", "status": "todo", "notes": "", "startdate": "", "enddate": ""},
  {"name": "Digital Archives Task", "subject": "L I S 440", "duedate": "11/21/2025", "status": "todo", "notes": "", "startdate": "", "enddate": ""},
  {"name": "Information Retrieval Work", "subject": "L I S 440", "duedate": "11/26/2025", "status": "todo", "notes": "", "startdate": "", "enddate": ""},
  {"name": "Database Worksheet", "subject": "L I S 440", "duedate": "12/01/2025", "status": "todo", "notes": "", "startdate": "", "enddate": ""},
  {"name": "Catalog Design Task", "subject": "L I S 440", "duedate": "12/06/2025", "status": "todo", "notes": "", "startdate": "", "enddate": ""},
  {"name": "Taxonomy Notes", "subject": "L I S 440", "duedate": "12/11/2025", "status": "todo", "notes": "", "startdate": "", "enddate": ""},
  {"name": "Metadata Review", "subject": "L I S 440", "duedate": "12/16/2025", "status": "todo", "notes": "", "startdate": "", "enddate": ""},

  {"name": "Vector Calculus Homework", "subject": "MATH 221", "duedate": "11/16/2025", "status": "todo", "notes": "", "startdate": "", "enddate": ""},
  {"name": "Optimization Problems", "subject": "MATH 221", "duedate": "11/21/2025", "status": "todo", "notes": "", "startdate": "", "enddate": ""},
  {"name": "Gradient Practice", "subject": "MATH 221", "duedate": "11/26/2025", "status": "todo", "notes": "", "startdate": "", "enddate": ""},
  {"name": "Integral Problems", "subject": "MATH 221", "duedate": "12/01/2025", "status": "todo", "notes": "", "startdate": "", "enddate": ""},
  {"name": "Surface Integrals", "subject": "MATH 221", "duedate": "12/06/2025", "status": "todo", "notes": "", "startdate": "", "enddate": ""},
  {"name": "Parametric Curves", "subject": "MATH 221", "duedate": "12/11/2025", "status": "todo", "notes": "", "startdate": "", "enddate": ""},
  {"name": "Vector Review", "subject": "MATH 221", "duedate": "12/16/2025", "status": "todo", "notes": "", "startdate": "", "enddate": ""},

  {"name": "Probability Worksheet", "subject": "STAT 222", "duedate": "11/16/2025", "status": "todo", "notes": "", "startdate": "", "enddate": ""},
  {"name": "Regression Homework", "subject": "STAT 222", "duedate": "11/21/2025", "status": "todo", "notes": "", "startdate": "", "enddate": ""},
  {"name": "Hypothesis Testing Practice", "subject": "STAT 222", "duedate": "11/26/2025", "status": "todo", "notes": "", "startdate": "", "enddate": ""},
  {"name": "Sampling Problems", "subject": "STAT 222", "duedate": "12/01/2025", "status": "todo", "notes": "", "startdate": "", "enddate": ""},
  {"name": "ANOVA Worksheet", "subject": "STAT 222", "duedate": "12/06/2025", "status": "todo", "notes": "", "startdate": "", "enddate": ""},
  {"name": "Correlation Review", "subject": "STAT 222", "duedate": "12/11/2025", "status": "todo", "notes": "", "startdate": "", "enddate": ""},
  {"name": "Stochastic Modeling Task", "subject": "STAT 222", "duedate": "12/16/2025", "status": "todo", "notes": "", "startdate": "", "enddate": ""},

  {"name": "Thermodynamics Homework", "subject": "CHEM 340", "duedate": "11/16/2025", "status": "todo", "notes": "", "startdate": "", "enddate": ""},
  {"name": "Kinetics Worksheet", "subject": "CHEM 340", "duedate": "11/18/2025", "status": "todo", "notes": "", "startdate": "", "enddate": ""},
  {"name": "Quantum Chemistry Problems", "subject": "CHEM 340", "duedate": "11/21/2025", "status": "todo", "notes": "", "startdate": "", "enddate": ""},
  {"name": "Spectroscopy Worksheet", "subject": "CHEM 340", "duedate": "11/26/2025", "status": "todo", "notes": "", "startdate": "", "enddate": ""},
  {"name": "Reaction Mechanisms", "subject": "CHEM 340", "duedate": "12/01/2025", "status": "todo", "notes": "", "startdate": "", "enddate": ""},
  {"name": "Equilibrium Practice", "subject": "CHEM 340", "duedate": "12/06/2025", "status": "todo", "notes": "", "startdate": "", "enddate": ""},
  {"name": "Organic Chemistry Notes", "subject": "CHEM 340", "duedate": "12/11/2025", "status": "todo", "notes": "", "startdate": "", "enddate": ""},
  {"name": "Chemistry Review", "subject": "CHEM 340", "duedate": "12/16/2025", "status": "todo", "notes": "", "startdate": "", "enddate": ""},

  // Completed Assignments
  
  {"name": "Circuit Theory Review", "subject": "ECE 252", "duedate": "10/12/2025", "status": "done", "notes": "", "startdate": "10/05/2025", "enddate": "10/10/2025"},
  {"name": "Microcontroller Lab", "subject": "ECE 252", "duedate": "09/30/2025", "status": "done", "notes": "", "startdate": "09/20/2025", "enddate": "09/27/2025"},
  {"name": "Signal Processing Worksheet", "subject": "ECE 252", "duedate": "10/20/2025", "status": "done", "notes": "", "startdate": "10/10/2025", "enddate": "10/17/2025"},

  {"name": "Pipeline Optimization Task", "subject": "COMP SCI 571", "duedate": "10/05/2025", "status": "done", "notes": "", "startdate": "09/28/2025", "enddate": "10/03/2025"},
  {"name": "Feature Engineering Mini-Project", "subject": "COMP SCI 571", "duedate": "10/18/2025", "status": "done", "notes": "", "startdate": "10/08/2025", "enddate": "10/15/2025"},
  {"name": "SVM Practice Set", "subject": "COMP SCI 571", "duedate": "09/25/2025", "status": "done", "notes": "", "startdate": "09/15/2025", "enddate": "09/22/2025"},

  {"name": "Cell Signaling Notes", "subject": "BIO 330", "duedate": "10/01/2025", "status": "done", "notes": "", "startdate": "09/25/2025", "enddate": "09/29/2025"},
  {"name": "Molecular Transport Worksheet", "subject": "BIO 330", "duedate": "09/18/2025", "status": "done", "notes": "", "startdate": "09/10/2025", "enddate": "09/15/2025"},
  {"name": "DNA Replication Homework", "subject": "BIO 330", "duedate": "10/10/2025", "status": "done", "notes": "", "startdate": "10/01/2025", "enddate": "10/06/2025"},

  {"name": "Indexing Assignment", "subject": "L I S 440", "duedate": "10/02/2025", "status": "done", "notes": "", "startdate": "09/24/2025", "enddate": "09/29/2025"},
  {"name": "Ontology Review", "subject": "L I S 440", "duedate": "09/22/2025", "status": "done", "notes": "", "startdate": "09/14/2025", "enddate": "09/19/2025"},

  {"name": "Series Practice Set", "subject": "MATH 221", "duedate": "10/08/2025", "status": "done", "notes": "", "startdate": "10/01/2025", "enddate": "10/05/2025"},
  {"name": "Multivariable Limits Task", "subject": "MATH 221", "duedate": "09/28/2025", "status": "done", "notes": "", "startdate": "09/18/2025", "enddate": "09/25/2025"},

  {"name": "Discrete Probability Review", "subject": "STAT 222", "duedate": "09/30/2025", "status": "done", "notes": "", "startdate": "09/22/2025", "enddate": "09/27/2025"},
  {"name": "Chemical Bonding Worksheet", "subject": "CHEM 340", "duedate": "10/04/2025", "status": "done", "notes": "", "startdate": "09/26/2025", "enddate": "10/01/2025"}

];

export default assignmentsData;