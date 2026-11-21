#!/usr/bin/env python3
import time
import subprocess
import sys

SCENES = [
    {
        "name": "Scene 1: Landing Page (PivotCraft AI)",
        "url": "http://localhost:3000/",
        "duration": 8,
        "scroll_down": True
    },
    {
        "name": "Scene 2: Pivot Studio Dashboard",
        "url": "http://localhost:3000/demo",
        "duration": 10,
        "scroll_down": True
    },
    {
        "name": "Scene 3: Opportunity Match & Real JD Analyzer",
        "url": "http://localhost:3000/opportunity-match",
        "duration": 9,
        "scroll_down": True
    },
    {
        "name": "Scene 4: Weekly Learning Planner & Roadmap",
        "url": "http://localhost:3000/weekly-planner",
        "duration": 8,
        "scroll_down": True
    },
    {
        "name": "Scene 5: Project Forge (Tailored Portfolio Proof)",
        "url": "http://localhost:3000/project-forge",
        "duration": 8,
        "scroll_down": True
    },
    {
        "name": "Scene 6: Rubric-Scored Mock Interview Arena",
        "url": "http://localhost:3000/interview-arena",
        "duration": 8,
        "scroll_down": True
    },
    {
        "name": "Scene 7: Application Tracker & Response Pattern Learning",
        "url": "http://localhost:3000/applications",
        "duration": 9,
        "scroll_down": True
    },
    {
        "name": "Scene 8: Skill Proof Lab & Verifiable Evidence",
        "url": "http://localhost:3000/proof-of-skill",
        "duration": 8,
        "scroll_down": True
    },
    {
        "name": "Scene 9: Interactive Evidence Graph & Provenance",
        "url": "http://localhost:3000/evidence-graph",
        "duration": 8,
        "scroll_down": True
    },
    {
        "name": "Scene 10: Career Twin What-If Lab",
        "url": "http://localhost:3000/career-twin",
        "duration": 8,
        "scroll_down": True
    },
    {
        "name": "Final Scene: Return to Mission Control / Studio",
        "url": "http://localhost:3000/dashboard",
        "duration": 6,
        "scroll_down": False
    }
]

def run_applescript(script):
    subprocess.run(["osascript", "-e", script], check=False)

def main():
    print("=" * 60)
    print("🎬 STARTING PIVOTCRAFT AI AUTOMATED DEMO WALKTHROUGH")
    print("=" * 60)
    
    # 1. Activate Chrome
    run_applescript('tell application "Google Chrome" to activate')
    time.sleep(1)
    
    for i, scene in enumerate(SCENES, 1):
        print(f"\n[{i}/{len(SCENES)}] ▶ {scene['name']}...")
        run_applescript(f'tell application "Google Chrome" to set URL of active tab of front window to "{scene["url"]}"')
        
        half_time = scene["duration"] / 2.0
        time.sleep(half_time)
        
        if scene["scroll_down"]:
            # Smooth scroll down to reveal card content
            run_applescript('tell application "System Events" to key code 121') # Page Down
            time.sleep(half_time)
            # Smooth scroll back up
            run_applescript('tell application "System Events" to key code 115') # Home / Page Up
        else:
            time.sleep(half_time)
            
    print("\n" + "=" * 60)
    print("✅ DEMO WALKTHROUGH COMPLETE!")
    print("=" * 60)

if __name__ == "__main__":
    main()

